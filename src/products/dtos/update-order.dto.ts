/* eslint-disable prettier/prettier */
import { IsArray, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDTO } from './create-order.dto';

export class UpdateOrderDTO {
  @IsOptional()
  @IsString()
  client?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  @IsOptional()
  items?: OrderItemDTO[];
}
