import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersProcessor } from './orders.processor';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatusHistory } from './entities/order-status-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, OrderStatusHistory]),
    BullModule.registerQueue({ name: 'orders' }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersProcessor],
})
export class OrdersModule {}
