import { IsEnum, IsInt, IsString, Min } from 'class-validator';
import { Size } from '../../common/enums/size.enum';

export class CreateProductVariantDto {
  @IsString()
  color!: string;

  @IsEnum(Size)
  size!: Size;

  @IsInt()
  @Min(0)
  stock!: number;
}
