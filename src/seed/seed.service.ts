import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../users/entities/address.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

import { UserSeeder } from './seeder/user.seeder';
import { ProductSeeder } from './seeder/product.seeder';
import { MinioSeeder } from './seeder/minio.seeder';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly userSeeder: UserSeeder,
    private readonly productSeeder: ProductSeeder,
    private readonly minioSeeder: MinioSeeder,
  ) {}

  async run() {
    await this.addressRepository.createQueryBuilder().delete().execute();
    await this.userRepository.createQueryBuilder().delete().execute();
    await this.productRepository.createQueryBuilder().delete().execute();

    await this.minioSeeder.seed();

    await this.userSeeder.seed();

    await this.productSeeder.seed();

    console.log('Seed completed');
  }
}
