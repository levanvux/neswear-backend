import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class AddCartItemDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  productVariantId!: number;

  @Type(() => Number)
  @IsInt()
  quantity!: number;
}
