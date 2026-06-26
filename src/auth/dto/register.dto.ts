import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../users/dto/create-address.dto';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
    message:
      'Use a password with at least 8 characters, including one lowercase letter, one number, and one special character.',
  })
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses?: CreateAddressDto[];
}
