import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '../users/entities/address.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

import { SeedService } from './seed.service';
import { ProductSeeder } from './seeder/product.seeder';
import { UserSeeder } from './seeder/user.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User, Product])],
  providers: [SeedService, UserSeeder, ProductSeeder],
})
export class SeedModule {}
