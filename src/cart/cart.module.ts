import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    AuthModule,
    ProductsModule,
    StorageModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
