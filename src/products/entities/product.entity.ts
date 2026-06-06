import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { ProductImage } from './product-image.entity';

export enum Category {
  SHIRT = 'shirt',
  PANTS = 'pants',
  JACKET = 'jacket',
  UNDERWEAR = 'underwear',
  ACCESSORY = 'accessory',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category!: Category;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images!: ProductImage[];

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants!: ProductVariant[];
}
