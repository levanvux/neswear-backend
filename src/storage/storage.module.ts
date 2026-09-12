import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
