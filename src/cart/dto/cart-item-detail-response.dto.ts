import { Category } from '../../common/enums/category.enum';
import { Size } from '../../common/enums/size.enum';

export class CartItemDetailResponseDto {
  id!: number;
  productVariantId!: number;
  quantity!: number;

  color!: string;
  size!: Size;
  stock!: number;

  productId!: number;
  productName!: string;
  productSlug!: string;
  productPrice!: number;
  productCategory!: Category;
  thumbnailUrl!: string;
}
