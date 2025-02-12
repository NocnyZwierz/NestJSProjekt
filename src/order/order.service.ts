/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }
  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }
  public async deleteById(id: Order['id']): Promise<Order> {
    const order = await this.getById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prismaService.order.delete({
      where: { id },
    });
  }
  public async create(orderData: CreateOrderDTO): Promise<Order> {
    return this.prismaService.order.create({
      data: {
        client: orderData.client,
        address: orderData.address,
      },
    }).then((order) => {
      return this.prismaService.orderItem.createMany({
        data: orderData.items.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      }).then(() => order);
    });
  }
  public async updateById(
    id: string,
    orderData: UpdateOrderDTO
  ): Promise<Order> {
    const order = await this.getById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    return this.prismaService.order.update({
      where: { id },
      data: {
        client: orderData.client,
        address: orderData.address,
      },
    }).then(async (order) => {
      if (orderData.items) {
        await this.prismaService.orderItem.deleteMany({
          where: { orderId: id },
        });
    
        await this.prismaService.orderItem.createMany({
          data: orderData.items.map((item) => ({
            orderId: id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
      }
      return order;
    });
  }
}
