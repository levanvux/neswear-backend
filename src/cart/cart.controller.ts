import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CartService } from './cart.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemQuantityDto } from './dto/update-cart-item-quantity.dto';
import { DeleteCartItemsDto } from './dto/delete-cart-items.dto';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { CartItemDetailResponseDto } from './dto/cart-item-detail-response.dto';
import { CartItemResponseDto } from './dto/cart-item-response.dto';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('items')
  getItems(
    @Request() req: { user: ActiveUserData },
    @Query() dto: PaginationQueryDto,
  ): Promise<PaginatedResponse<CartItemDetailResponseDto>> {
    return this.cartService.findAll(req.user.userId, dto.page, dto.limit);
  }

  @Post('items')
  addItemToCart(
    @Request() req: { user: ActiveUserData },
    @Body() addCartItemDto: AddCartItemDto,
  ): Promise<CartItemResponseDto> {
    return this.cartService.addItem(req.user.userId, addCartItemDto);
  }

  @Patch('items/:id/quantity')
  updateCartItemQuantity(
    @Request() req: { user: ActiveUserData },
    @Param('id', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemQuantityDto,
  ): Promise<CartItemResponseDto> {
    return this.cartService.updateItemQuantity(
      req.user.userId,
      itemId,
      dto.quantity,
    );
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteItem(
    @Request() req: { user: ActiveUserData },
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.deleteItem(req.user.userId, itemId);
  }

  @Delete('items')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteItems(
    @Request() req: { user: ActiveUserData },
    @Body() dto: DeleteCartItemsDto,
  ) {
    return this.cartService.deleteItems(req.user.userId, dto);
  }
}
