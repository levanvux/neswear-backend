import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { Order } from './order.entity';
import { Size } from '../../common/enums/size.enum';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @Column()
  quantity!: number;

  @Column({ nullable: true })
  productVariantId?: number | null;

  @Column()
  productPrice!: number;

  @Column()
  productName!: string;

  @Column()
  productColor!: string;

  @Column({
    type: 'enum',
    enum: Size,
  })
  productSize!: Size;

  @ManyToOne(() => ProductVariant, (variant) => variant.orderItems, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productVariantId' })
  productVariant?: ProductVariant | null;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order?: Order;
}
