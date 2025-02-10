/* eslint-disable prettier/prettier */
import { IsUUID, IsNotEmpty, IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDTO {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
