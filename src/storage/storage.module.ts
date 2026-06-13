import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [MinioModule],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
