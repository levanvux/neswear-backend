import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  readonly bucket: string;
  readonly client: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow('MINIO_BUCKET');

    this.client = new Minio.Client({
      endPoint: this.configService.getOrThrow('MINIO_ENDPOINT'),
      port: Number(this.configService.getOrThrow('MINIO_PORT')),
      useSSL: this.configService.getOrThrow('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.getOrThrow('MINIO_USER'),
      secretKey: this.configService.getOrThrow('MINIO_PASSWORD'),
    });
  }
}
