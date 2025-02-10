/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDTO } from './../products/dtos/create-order.dto';
import { UpdateOrderDTO } from './../products/dtos/update-order.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll() {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() orderData: UpdateOrderDTO) {
    if (!this.ordersService.getById(id)) throw new NotFoundException('Order not found');
    this.ordersService.updateById(id, orderData);
    return { success: true };
  }

  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id)) throw new NotFoundException('Order not found');
    this.ordersService.deleteById(id);
    return { success: true };
  }
}
