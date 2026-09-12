import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class ProductQueryDto extends PaginationQueryDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  @IsIn(['popular', 'price_asc', 'price_desc'])
  sort: 'popular' | 'price_asc' | 'price_desc' = 'popular';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10_000_000)
  min_price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10_000_000)
  max_price?: number;
}
