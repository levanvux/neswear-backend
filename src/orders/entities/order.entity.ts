import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { PaymentMethod } from '../../common/enums/payment-method.enum';
import { OrderCancelCode } from '../../common/enums/order-cancel-code.enum';
import { OrderItem } from './order-item.entity';
import { User } from '../../users/entities/user.entity';
import { OrderStatusHistory } from './order-status-history.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
  })
  userId!: number | null;

  @Column()
  totalPrice!: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Column({
    nullable: true,
    type: 'enum',
    enum: OrderCancelCode,
  })
  cancelCode!: OrderCancelCode | null;

  @Column({
    nullable: true,
    type: 'text',
  })
  cancelReason!: string | null;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod!: PaymentMethod;

  @Column()
  shippingStreet!: string;

  @Column()
  shippingCity!: string;

  @Column()
  shippingWard!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user!: User | null;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items!: OrderItem[];

  @OneToMany(() => OrderStatusHistory, (statusHistory) => statusHistory.order)
  statusHistories!: OrderStatusHistory[];
}
