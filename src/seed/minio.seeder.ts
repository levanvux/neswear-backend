import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioSeeder {
  private readonly bucket = 'assets';

  private readonly client: Minio.Client;

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

  async seed() {
    const exists = await this.client.bucketExists(this.bucket);

    if (!exists) {
      await this.client.makeBucket(this.bucket);
    }

    const root = path.join(process.cwd(), 'seed-assets');

    await this.uploadDirectory(root);
  }

  private async uploadDirectory(directory: string, prefix = '') {
    const entries = fs.readdirSync(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await this.uploadDirectory(fullPath, `${prefix}${entry.name}/`);

        continue;
      }

      const objectName = `${prefix}${entry.name}`;

      await this.client.fPutObject(this.bucket, objectName, fullPath);

      console.log(`Uploaded: ${objectName}`);
    }
  }
}
