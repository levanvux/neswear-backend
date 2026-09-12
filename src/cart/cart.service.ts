import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductsService } from '../products/products.service';
import { StorageService } from '../storage/storage.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { DeleteCartItemsDto } from './dto/delete-cart-items.dto';
import { CartItemResponseDto } from './dto/cart-item-response.dto';
import { CartItemDetailResponseDto } from './dto/cart-item-detail-response.dto';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,

    private productsService: ProductsService,
    private storageService: StorageService,
  ) {}

  async getOrCreate(userId: number, queryOptions = {}) {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      ...queryOptions,
    });
    if (!cart) {
      const newCart = await this.cartRepository.save(
        this.cartRepository.create({ userId }),
      );

      return newCart;
    }

    return cart;
  }

  async findAll(
    userId: number,
    page: number = 1,
    limit: number = 8,
  ): Promise<PaginatedResponse<CartItemDetailResponseDto>> {
    const cart = await this.getOrCreate(userId);

    const [cartItems, total] = await Promise.all([
      this.cartItemRepository.find({
        where: {
          cart: {
            id: cart.id,
          },
        },
        relations: {
          variant: {
            product: true,
          },
        },
        order: {
          updatedAt: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.cartItemRepository.countBy({
        cart: {
          id: cart.id,
        },
      }),
    ]);

    const flattenedItems = await Promise.all(
      cartItems.map(async (item) => {
        const variant = item.variant!;
        const product = variant.product;

        return {
          id: item.id,
          productVariantId: item.productVariantId,
          quantity: item.quantity,

          color: variant.color,
          size: variant.size,
          stock: variant.stock,

          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          productPrice: product.price,
          productCategory: product.category,
          thumbnailUrl: await this.storageService.getPresignedUrl(
            product.thumbnailKey,
          ),
        };
      }),
    );

    return {
      data: flattenedItems,
      total,
      page,
      limit,
    };
  }

  async addItem(
    userId: number,
    addCartItemDto: AddCartItemDto,
  ): Promise<CartItemResponseDto> {
    const cart = await this.getOrCreate(userId);

    const { productVariantId, quantity } = addCartItemDto;

    const cartItem = await this.cartItemRepository.findOneBy({
      cart: {
        id: cart.id,
      },
      productVariantId,
    });

    const totalQuantity = quantity + (cartItem ? cartItem.quantity : 0);

    await this.productsService.validateVariantStock(
      productVariantId,
      totalQuantity,
    );

    if (!cartItem) {
      return await this.cartItemRepository.save(
        this.cartItemRepository.create({
          ...addCartItemDto,
          cart: {
            id: cart.id,
          },
        }),
      );
    }

    cartItem.quantity = totalQuantity;
    return await this.cartItemRepository.save(cartItem);
  }

  async updateItemQuantity(
    userId: number,
    itemId: number,
    quantity: number,
  ): Promise<CartItemResponseDto> {
    if (quantity <= 0) {
      throw new BadRequestException('Invalid quantity');
    }

    const cart = await this.getOrCreate(userId);

    const cartItem = await this.cartItemRepository.findOneBy({
      id: itemId,
      cart: {
        id: cart.id,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.productsService.validateVariantStock(
      cartItem.productVariantId,
      quantity,
    );

    cartItem.quantity = quantity;
    return await this.cartItemRepository.save(cartItem);
  }

  async deleteItem(userId: number, itemId: number) {
    const cart = await this.cartRepository.findOne({
      where: { userId },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const result = await this.cartItemRepository.delete({
      id: itemId,
      cart: {
        id: cart.id,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  async deleteItems(userId: number, dto: DeleteCartItemsDto) {
    const cart = await this.cartRepository.findOne({
      where: { userId },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const { itemIds } = dto;

    const result = await this.cartItemRepository.delete({
      id: In(itemIds),
      cart: {
        id: cart.id,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Cart items not found');
    }
  }
}
