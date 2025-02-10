/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): Product[] {
    return this.productsService.getAll();
  }
  
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');
    this.productsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');

    this.productsService.updateById(id, productData);
    return { success: true };
  }
}
