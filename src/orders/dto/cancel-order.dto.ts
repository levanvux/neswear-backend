import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { OrderCancelCode } from '../../common/enums/order-cancel-code.enum';

export class CancelOrderDto {
  @IsEnum(OrderCancelCode)
  cancelCode!: OrderCancelCode;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  cancelReason?: string;
}
