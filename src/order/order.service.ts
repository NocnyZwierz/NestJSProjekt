/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from './../products/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';

@Injectable()
export class OrdersService {
  updateById(id: string, orderData: UpdateOrderDTO) {
    throw new Error('Method not implemented.');
  }
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((o) => o.id === id);
  }

  public deleteById(id: Order['id']): void {
    db.orders = db.orders.filter((o) => o.id !== id);
  }

  public create(orderData: CreateOrderDTO): Order {
    const newOrder: Order = {
      id: uuidv4(),
      client: 'Default Client',
      address: 'Default Address',
      productId: orderData.items[0].productId,
    };
  
    db.orders.push(newOrder);
    return newOrder;
  }
  
}
