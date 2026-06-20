import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../users/dto/create-address.dto';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  confirmPassword!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Matches(/^0\d{9}$/, {
    message: 'Invalid Vietnamese phone number',
  })
  phoneNumber!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses!: CreateAddressDto[];
}
