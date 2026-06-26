import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MinioModule } from '../minio/minio.module';

import { Address } from '../users/entities/address.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

import { SeedService } from './seed.service';
import { ProductSeeder } from './seeder/product.seeder';
import { MinioSeeder } from './seeder/minio.seeder';
import { UserSeeder } from './seeder/user.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User, Product]), MinioModule],
  providers: [SeedService, UserSeeder, ProductSeeder, MinioSeeder],
})
export class SeedModule {}
