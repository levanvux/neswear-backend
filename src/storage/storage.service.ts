import { Injectable, OnModuleInit } from '@nestjs/common';
import { MinioService } from '../minio/minio.service';
import * as Minio from 'minio';
// import { posix, extname } from 'path';
// import { randomUUID } from 'crypto';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly bucket: string;
  private readonly client: Minio.Client;
  constructor(private readonly minioService: MinioService) {
    this.bucket = this.minioService.bucket;
    this.client = this.minioService.client;
  }

  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket);
    if (!exists) {
      await this.client.makeBucket(this.bucket);
    }
  }

  // async upload(uploadPath: string, file: Express.Multer.File) {
  //   const objectName = posix.join(
  //     uploadPath,
  //     `${randomUUID()}${extname(file.originalname)}`,
  //   );

  //   await this.client.putObject(
  //     this.bucket,
  //     objectName,
  //     file.buffer,
  //     file.size,
  //     { 'Content-Type': file.mimetype },
  //   );

  //   return { objectName };
  // }

  // async delete(objectName: string) {
  //   await this.client.removeObject(this.bucket, objectName);
  // }

  async getPresignedUrl(
    objectName: string,
    expirySeconds: number = 3600,
  ): Promise<string> {
    return this.client.presignedGetObject(
      this.bucket,
      objectName,
      expirySeconds,
    );
  }
}
