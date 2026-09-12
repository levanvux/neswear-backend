import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DefaultAzureCredential } from '@azure/identity';
import {
  BlobServiceClient,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
} from '@azure/storage-blob';
// import { posix, extname } from 'path';
// import { randomUUID } from 'crypto';

import { RedisService } from '../redis/redis.service';
@Injectable()
export class StorageService {
  private readonly accountName: string;
  private readonly containerName: string;
  private readonly endpoint: string;
  private readonly client: BlobServiceClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: RedisService,
  ) {
    this.accountName = configService.getOrThrow('AZURE_STORAGE_ACCOUNT_NAME');
    this.containerName = configService.getOrThrow(
      'AZURE_STORAGE_CONTAINER_NAME',
    );

    this.endpoint = `https://${this.accountName}.blob.core.windows.net`;

    this.client = new BlobServiceClient(
      this.endpoint,
      new DefaultAzureCredential(),
    );
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
    expiryMinutes: number = 60,
  ): Promise<string> {
    const cachedSAS = await this.cacheService.get(
      `storage:sas:${this.containerName}`,
    );
    if (cachedSAS !== null) {
      return `${this.endpoint}/${this.containerName}/${objectName}?${cachedSAS}`;
    }

    const startTime = new Date(Date.now() - 5 * 60 * 1000);
    const expiryTime = new Date(Date.now() + expiryMinutes * 60 * 1000);

    const userDelegationKey = await this.client.getUserDelegationKey(
      startTime,
      expiryTime,
    );

    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName: this.containerName,
        permissions: ContainerSASPermissions.parse('r'),
        startsOn: startTime,
        expiresOn: expiryTime,
      },
      userDelegationKey,
      this.accountName,
    ).toString();

    await this.cacheService.set(
      `storage:sas:${this.containerName}`,
      containerSAS,
      (expiryMinutes - 10) * 60,
    );

    return `${this.endpoint}/${this.containerName}/${objectName}?${containerSAS}`;
  }
}
