import { NotFoundException } from '@nestjs/common';
import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { OrderStatus } from '../common/enums/order-status.enum';
import { OrderCancelCode } from '../common/enums/order-cancel-code.enum';

@Processor('orders')
export class OrdersProcessor extends WorkerHost {
  constructor(
    private readonly dataSource: DataSource,

    @InjectQueue('orders')
    private readonly ordersQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<{ orderId: number }>) {
    switch (job.name) {
      case 'order-expiration':
        return this.handleOrderExpiration(job);
      case 'order-start-delivery':
        return this.handleStartDelivery(job);
      case 'order-complete':
        return this.handleOrderComplete(job);
      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  }

  private async handleOrderExpiration(job: Job<{ orderId: number }>) {
    return this.dataSource.transaction(async (manager) => {
      const { orderId } = job.data;
      const order = await manager.findOne(Order, {
        where: {
          id: orderId,
        },
        relations: {
          items: true,
        },
      });

      if (!order || order.status !== OrderStatus.PENDING) {
        return;
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
      order.cancelCode = OrderCancelCode.PENDING_TIMEOUT;
      await manager.save(order);

      const canceledHistory = manager.create(OrderStatusHistory, {
        orderId: order.id,
        status: OrderStatus.CANCELED,
      });
      await manager.save(canceledHistory);
    });
  }

  private async handleStartDelivery(job: Job<{ orderId: number }>) {
    const { orderId } = job.data;

    const startedDelivery = await this.dataSource.transaction(
      async (manager) => {
        const order = await manager.findOne(Order, {
          where: {
            id: orderId,
          },
        });

        if (!order || order.status !== OrderStatus.CONFIRMED) {
          return false;
        }

        order.status = OrderStatus.DELIVERING;
        await manager.save(order);

        const history = manager.create(OrderStatusHistory, {
          orderId: order.id,
          status: OrderStatus.DELIVERING,
        });
        await manager.save(history);

        return true;
      },
    );

    if (!startedDelivery) {
      return;
    }

    await this.ordersQueue.add(
      'order-complete',
      { orderId },
      { delay: 5 * 60 * 1000 },
    );
  }

  private async handleOrderComplete(job: Job<{ orderId: number }>) {
    return this.dataSource.transaction(async (manager) => {
      const { orderId } = job.data;
      const order = await manager.findOne(Order, {
        where: {
          id: orderId,
        },
      });

      if (!order || order.status !== OrderStatus.DELIVERING) {
        return;
      }

      order.status = OrderStatus.COMPLETED;
      await manager.save(order);

      const history = manager.create(OrderStatusHistory, {
        orderId: order.id,
        status: OrderStatus.COMPLETED,
      });
      await manager.save(history);
    });
  }
}
