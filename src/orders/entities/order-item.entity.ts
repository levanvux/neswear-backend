import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.orderItems)
  productVariant!: ProductVariant;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;
}
