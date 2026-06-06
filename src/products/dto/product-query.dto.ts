import { Type } from 'class-transformer';
import { IsIn, IsOptional, Min } from 'class-validator';

export class ProductQueryDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  @IsIn(['popular', 'price-asc', 'price-desc'])
  sort: 'popular' | 'price-asc' | 'price-desc' = 'popular';

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit = 6;
}
