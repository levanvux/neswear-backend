import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';
import { UploadService } from '../upload/upload.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,

    private uploadService: UploadService,
  ) {}

  async findAll(queryDto: ProductQueryDto) {
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

    const [data, total] = await query.getManyAndCount();
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['variants', 'images'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(
    createProductDto: CreateProductDto,
    files?: Express.Multer.File[],
  ) {
    const product = await this.productRepository.save(
      this.productRepository.create({
        name: createProductDto.name,
        price: createProductDto.price,
        category: createProductDto.category,
        variants: createProductDto.variants,
      }),
    );

    const imageKeys: string[] = [];
    if (files) {
      for (const file of files) {
        const res = await this.uploadService.upload(
          `products/${product.category}/${product.id}`,
          file,
        );

        imageKeys.push(res.objectName);
      }
    }

    const images = await this.productImageRepository.save(
      imageKeys.map((key) => ({
        productId: product.id,
        imageKey: key,
      })),
    );

    return { ...product, images };
  }

  async createVariant(productId: number, dto: CreateProductVariantDto) {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const variant = this.productVariantRepository.create({
      ...dto,
      productId,
    });

    return this.productVariantRepository.save(variant);
  }

  async createImage(productId: number, file: Express.Multer.File) {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { objectName } = await this.uploadService.upload(
      `products/${product.category}/${product.id}`,
      file,
    );

    const image = this.productImageRepository.create({
      imageKey: objectName,
      productId,
    });
    return this.productImageRepository.save(image);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);

    return this.productRepository.findOne({ where: { id } });
  }

  async updateVariant(id: number, updateVariantDto: UpdateProductVariantDto) {
    await this.productVariantRepository.update(id, updateVariantDto);

    return this.productVariantRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepository.remove(product);
  }

  async removeVariant(id: number) {
    const variant = await this.productVariantRepository.findOne({
      where: { id },
    });

    if (!variant) {
      throw new NotFoundException('Product variant not found');
    }

    return this.productVariantRepository.remove(variant);
  }

  async removeImage(id: number) {
    const image = await this.productImageRepository.findOne({
      where: { id },
    });

    if (!image) {
      throw new NotFoundException('Product image not found');
    }

    await this.uploadService.delete(image.imageKey);

    return this.productImageRepository.remove(image);
  }
}
