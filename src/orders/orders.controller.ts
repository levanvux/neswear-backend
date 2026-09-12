import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { Order } from './entities/order.entity';
import { CancelOrderDto } from './dto/cancel-order.dto';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    //TODO: create a custom decorator: @ActiveUser/CurrentUser("id") id: number
    @Req() req: { user: ActiveUserData },
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(req.user.userId, createOrderDto);
  }

  @Get()
  async findAll(
    @Req() req: { user: ActiveUserData },
    @Query() dto: PaginationQueryDto,
  ): Promise<PaginatedResponse<Order>> {
    return this.ordersService.findAll(req.user.userId, dto.page, dto.limit);
  }

  @Get(':id')
  async findOne(
    @Req() req: { user: ActiveUserData },
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<Order> {
    return this.ordersService.findOne(req.user.userId, orderId);
  }

  @Patch(':id/cancel')
  cancelOrder(
    @Req() req: { user: ActiveUserData },
    @Param('id', ParseIntPipe) orderId: number,
    @Body() dto: CancelOrderDto,
  ) {
    return this.ordersService.cancelOrder(req.user.userId, orderId, dto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
