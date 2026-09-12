import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { ProductImage } from './product-image.entity';
import { Category } from '../../common/enums/category.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({
    type: 'integer',
  })
  price!: number;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category!: Category;

  @Column({ nullable: true })
  thumbnailKey!: string;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images?: ProductImage[];

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants?: ProductVariant[];
}
