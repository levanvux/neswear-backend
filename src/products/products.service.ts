import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';

import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';
import { StorageService } from '../storage/storage.service';

// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
// import { CreateProductVariantDto } from './dto/create-product-variant.dto';
// import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ProductCard } from './interfaces/product-card.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,

    private storageService: StorageService,
  ) {}

  async findAll(queryDto: ProductQueryDto) {
    const { search, category, sort, page, limit, min_price, max_price } =
      queryDto;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.variants', 'variant');

    if (search) {
      query.andWhere('product.slug ILIKE :search', {
        search: `%${slugify(search, { lower: true, strict: true, locale: 'vi' })}%`,
      });
    }

    if (category) {
      query.andWhere('product.category = :category', {
        category,
      });
    }

    if (min_price !== undefined) {
      query.andWhere('product.price >= :min_price', { min_price });
    }

    if (max_price !== undefined) {
      query.andWhere('product.price <= :max_price', { max_price });
    }

    if (sort) {
      if (sort === 'popular') {
        // query.orderBy();
      } else if (sort === 'price_asc') {
        query.orderBy('product.price', 'ASC');
      } else if (sort === 'price_desc') {
        query.orderBy('product.price', 'DESC');
      }
    }

    const total = await query.clone().getCount();

    const data = await query
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('product.slug', 'slug')
      .addSelect('product.price', 'price')
      .addSelect('product.thumbnailKey', 'thumbnailKey')
      .addSelect('COUNT(DISTINCT variant.color)', 'colorCount')
      .addSelect('COUNT(DISTINCT variant.size)', 'sizeCount')
      .groupBy('product.id')
      .addGroupBy('product.name')
      .addGroupBy('product.price')
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany();

    return {
      data: await Promise.all(
        data.map(async (product: ProductCard) => ({
          ...product,
          price: Number(product.price),
          thumbnailUrl: await this.storageService.getPresignedUrl(
            product.thumbnailKey,
          ),
          colorCount: Number(product.colorCount),
          sizeCount: Number(product.sizeCount),
        })),
      ),
      total,
      page,
      limit,
    };
  }

  async findOneBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['variants', 'images'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      ...product,
      images: await Promise.all(
        product.images.map(async (img) => ({
          ...img,
          imageUrl: await this.storageService.getPresignedUrl(img.imageKey),
        })),
      ),
    };
  }

  // async create(
  //   createProductDto: CreateProductDto,
  //   files?: Express.Multer.File[],
  // ) {
  //   const product = await this.productRepository.save(
  //     this.productRepository.create({
  //       name: createProductDto.name,
  //       slug: slugify(createProductDto.name, {
  //         lower: true,
  //         strict: true,
  //         locale: 'vi',
  //       }),
  //       price: createProductDto.price,
  //       category: createProductDto.category,
  //       variants: createProductDto.variants,
  //     }),
  //   );

  //   const imageKeys: string[] = [];
  //   if (files) {
  //     for (const file of files) {
  //       const res = await this.storageService.upload(
  //         `products/${product.category}/${product.id}`,
  //         file,
  //       );

  //       imageKeys.push(res.objectName);
  //     }
  //   }

  //   const images = await this.productImageRepository.save(
  //     imageKeys.map((key) => ({
  //       productId: product.id,
  //       imageKey: key,
  //     })),
  //   );

  //   return { ...product, images };
  // }

  // async createVariant(productId: number, dto: CreateProductVariantDto) {
  //   const product = await this.productRepository.findOneBy({
  //     id: productId,
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   const variant = this.productVariantRepository.create({
  //     ...dto,
  //     productId,
  //   });

  //   return this.productVariantRepository.save(variant);
  // }

  // async createImage(productId: number, file: Express.Multer.File) {
  //   const product = await this.productRepository.findOneBy({
  //     id: productId,
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   const { objectName } = await this.storageService.upload(
  //     `products/${product.category}/${product.id}`,
  //     file,
  //   );

  //   const image = this.productImageRepository.create({
  //     imageKey: objectName,
  //     productId,
  //   });
  //   return this.productImageRepository.save(image);
  // }

  // async update(id: number, updateProductDto: UpdateProductDto) {
  //   const data = { ...updateProductDto };

  //   if (updateProductDto.name) {
  //     data.name = slugify(updateProductDto.name, {
  //       lower: true,
  //       strict: true,
  //       locale: 'vi',
  //     });
  //   }

  //   await this.productRepository.update(id, data);

  //   return this.productRepository.findOne({ where: { id } });
  // }

  // async updateVariant(id: number, updateVariantDto: UpdateProductVariantDto) {
  //   await this.productVariantRepository.update(id, updateVariantDto);

  //   return this.productVariantRepository.findOne({ where: { id } });
  // }

  // async remove(id: number) {
  //   const product = await this.productRepository.findOne({ where: { id } });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   return this.productRepository.remove(product);
  // }

  // async removeVariant(id: number) {
  //   const variant = await this.productVariantRepository.findOne({
  //     where: { id },
  //   });

  //   if (!variant) {
  //     throw new NotFoundException('Product variant not found');
  //   }

  //   return this.productVariantRepository.remove(variant);
  // }

  // async removeImage(id: number) {
  //   const image = await this.productImageRepository.findOne({
  //     where: { id },
  //   });

  //   if (!image) {
  //     throw new NotFoundException('Product image not found');
  //   }

  //   await this.storageService.delete(image.imageKey);

  //   return this.productImageRepository.remove(image);
  // }
}
