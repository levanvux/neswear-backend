import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';
import { PaymentMethod } from '../../common/enums/payment-method.enum';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];

  @Type(() => Number)
  @IsInt()
  addressId!: number;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}
