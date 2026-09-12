import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { Address } from '../users/entities/address.entity';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { OrderStatus } from '../common/enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(OrderStatusHistory)
    private orderStatusHistoriesRepo: Repository<OrderStatusHistory>,

    @InjectQueue('orders') private ordersQueue: Queue,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const order = await this.dataSource.transaction(async (manager) => {
      const { items, addressId, paymentMethod } = createOrderDto;

      const address = await manager.findOne(Address, {
        where: {
          id: addressId,
          user: {
            id: userId,
          },
        },
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const variantIds = items.map((i) => i.productVariantId);

      const variants = await manager.find(ProductVariant, {
        where: {
          id: In(variantIds),
        },
        relations: {
          product: true,
        },
      });

      let totalPrice = 0;
      const orderItems: OrderItem[] = [];

      for (const itemDto of items) {
        const { quantity, productVariantId } = itemDto;

        const variant = variants.find((v) => v.id === productVariantId);

        if (!variant) {
          throw new NotFoundException(
            `Product variant with id ${productVariantId} not found`,
          );
        }

        if (variant.stock < quantity) {
          throw new BadRequestException(
            `Product variant ${variant.product.name} stock is insufficient`,
          );
        }

        variant.stock -= quantity;
        await manager.save(ProductVariant, variant);

        totalPrice += quantity * variant.product.price;

        const orderItem = new OrderItem();
        orderItem.quantity = quantity;
        orderItem.productVariantId = productVariantId;
        orderItem.productPrice = variant.product.price;
        orderItem.productName = variant.product.name;
        orderItem.productColor = variant.color;
        orderItem.productSize = variant.size;

        orderItems.push(orderItem);
      }

      return manager.save(Order, {
        userId,
        totalPrice,
        paymentMethod,
        shippingStreet: address.street,
        shippingCity: address.city,
        shippingWard: address.ward,
        items: orderItems,
        status: OrderStatus.CONFIRMED,
      });
    });

    await this.orderStatusHistoriesRepo.save(
      this.orderStatusHistoriesRepo.create({
        orderId: order.id,
        status: order.status,
      }),
    );

    await this.ordersQueue.add(
      // 'order-expiration',
      'order-start-delivery',
      { orderId: order.id },
      // { delay: 30 * 60 * 1000 },
      { delay: 5 * 60 * 1000 },
    );

    return order;
  }

  async findAll(
    userId: number,
    page: number = 1,
    limit: number = 8,
  ): Promise<PaginatedResponse<Order>> {
    const [orders, total] = await Promise.all([
      this.ordersRepository.find({
        where: {
          userId,
        },
        // relations: {
        //   items: true,
        // },
        order: {
          updatedAt: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.ordersRepository.countBy({
        userId,
      }),
    ]);

    return {
      data: orders,
      total,
      page,
      limit,
    };
  }

  async findOne(userId: number, id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: {
        id,
        userId,
      },
      relations: {
        items: {
          productVariant: true,
        },
        statusHistories: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  cancelOrder(userId: number, id: number, dto: CancelOrderDto): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: {
          id,
          userId,
        },
        relations: {
          items: true,
        },
      });

      if (!order) {
        throw new BadRequestException('Order not found');
      }

      if (
        order.status !== OrderStatus.PENDING &&
        order.status !== OrderStatus.CONFIRMED
      ) {
        throw new BadRequestException(
          'Không thể hủy đơn ở trạng thái hiện tại',
        );
      }

      for (const item of order.items) {
        if (!item.productVariantId) {
          continue;
        }

        const variant = await manager.findOne(ProductVariant, {
          where: {
            id: item.productVariantId,
          },
        });

        if (!variant) {
          throw new NotFoundException(
            `Product variant ${item.productVariantId} not found`,
          );
        }

        variant.stock += item.quantity;
        await manager.save(variant);
      }

      order.status = OrderStatus.CANCELED;
      order.cancelCode = dto.cancelCode;
      if (dto.cancelReason) {
        order.cancelReason = dto.cancelReason;
      }
      await manager.save(order);

      const canceledHistory = manager.create(OrderStatusHistory, {
        orderId: order.id,
        status: OrderStatus.CANCELED,
      });
      await manager.save(canceledHistory);

      return order;
    });
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   console.log(updateOrderDto);
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
