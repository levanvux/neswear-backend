import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { OrderStatus } from '../../common/enums/order-status.enum';

@Entity('order_status_histories')
export class OrderStatusHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @ManyToOne(() => Order, (order) => order.statusHistories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order!: Order;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status!: OrderStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
