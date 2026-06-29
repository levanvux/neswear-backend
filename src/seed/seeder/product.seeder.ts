import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { productsSeed } from '../data/products.seed';

@Injectable()
export class ProductSeeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seed() {
    for (const data of productsSeed) {
      const product = this.productRepository.create({
        name: data.name,
        slug: data.slug,
        price: data.price,
        category: data.category,
        thumbnailKey: data.thumbnailKey,

        images: data.images.map((imageKey) => ({
          imageKey,
        })),

        variants: data.variants,
      });

      await this.productRepository.save(product);
    }
  }
}
