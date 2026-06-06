import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(queryDto: ProductQueryDto) {
    const { search, category, sort, page, limit } = queryDto;

    const query = this.productRepository.createQueryBuilder('product');

    if (search) {
      query.andWhere('product.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (category) {
      query.andWhere('product.category = :category', {
        category,
      });
    }

    if (sort) {
      if (sort === 'popular') {
        // query.orderBy();
      } else if (sort === 'price-asc') {
        query.orderBy('product.price', 'ASC');
      } else if (sort === 'price-desc') {
        query.orderBy('product.price', 'DESC');
      }
    }

    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['variants', 'images'],
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
