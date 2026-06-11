import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
// import { PaymentsModule } from './payments/payments.module';
// import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { UploadModule } from './upload/upload.module';
import { MinioModule } from './minio/minio.module';
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
    UploadModule,
    MinioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
