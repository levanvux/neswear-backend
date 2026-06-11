import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [MinioModule],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
