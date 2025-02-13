/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }
  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }
  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
  public async create(orderData: { productId: string; clientId: string }): Promise<Order> {
    return this.prismaService.order.create({
      data: {
        product: { connect: { id: orderData.productId } },
        client: { connect: { id: orderData.clientId } },
      },
    });
  }
  public async updateById(id: string, orderData: Partial<{ productId: string; clientId: string }>): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data: {
        product: orderData.productId ? { connect: { id: orderData.productId } } : undefined,
        client: orderData.clientId ? { connect: { id: orderData.clientId } } : undefined,
      },
    });
  }
}