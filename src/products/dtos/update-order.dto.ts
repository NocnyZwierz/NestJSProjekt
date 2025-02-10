/* eslint-disable prettier/prettier */
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDTO } from './create-order.dto';

export class UpdateOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}