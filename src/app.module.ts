import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
// import { PaymentsModule } from './payments/payments.module';
// import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { StorageModule } from './storage/storage.module';
import { MinioModule } from './minio/minio.module';
import { LocationsModule } from './locations/locations.module';
import { RedisModule } from './redis/redis.module';
import { HealthModule } from './health/health.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('PG_HOST'),
        port: configService.getOrThrow<number>('PG_PORT'),
        username: configService.getOrThrow<string>('PG_USER'),
        password: configService.getOrThrow<string>('PG_PASSWORD'),
        database: configService.getOrThrow<string>('PG_DB'),
        autoLoadEntities: true,
        synchronize:
          configService.getOrThrow<string>('NODE_ENV') === 'development'
            ? true
            : false,
      }),
    }),
    UsersModule,
    // PaymentsModule,
    // CartsModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    SeedModule,
    StorageModule,
    MinioModule,
    LocationsModule,
    RedisModule,
    HealthModule,
  ],
})
export class AppModule {}
