import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { Size } from '../../common/enums/size.enum';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  color!: string;

  @Column({
    type: 'enum',
    enum: Size,
  })
  size!: Size;

  @Column({ default: 0 })
  stock!: number;

  @Column()
  productId!: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productVariant)
  orderItems!: OrderItem[];
}
