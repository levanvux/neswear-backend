import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Matches(/^0\d{9}$/, {
    message: 'Invalid Vietnamese phone number',
  })
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses!: CreateAddressDto[];
}
