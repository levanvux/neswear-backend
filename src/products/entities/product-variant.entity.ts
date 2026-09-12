import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { Size } from '../../common/enums/size.enum';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column()
  color!: string;

  @Column({
    type: 'enum',
    enum: Size,
  })
  size!: Size;

  @Column({ default: 0 })
  stock!: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product!: Product;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productVariant)
  orderItems?: OrderItem[];
}
