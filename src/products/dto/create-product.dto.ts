import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Category } from '../../common/enums/category.enum';
import { CreateProductVariantDto } from './create-product-variant.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(0)
  price!: number;

  @IsEnum(Category)
  category!: Category;

  //   @IsArray()
  //   @IsString({ each: true })
  //   imageKeys!: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants!: CreateProductVariantDto[];
}
