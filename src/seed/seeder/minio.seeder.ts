import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import { MinioService } from '../../minio/minio.service';

@Injectable()
export class MinioSeeder {
  private readonly bucket: string;

  private readonly client: Minio.Client;

  constructor(private readonly minioService: MinioService) {
    this.bucket = this.minioService.bucket;
    this.client = this.minioService.client;
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
