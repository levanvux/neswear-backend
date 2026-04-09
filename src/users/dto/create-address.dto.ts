import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street!: string;
  @IsString()
  district!: string;
  @IsString()
  city!: string;
}
