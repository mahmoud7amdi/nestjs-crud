/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServise: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') productTitle: string,
    @Body('price') productPrice: number,
  ) {
    const generatedId = await this.productsServise.insertProduct(
      productTitle,
      productPrice,
    );
    return { id: generatedId };
  }
  @Get()
  async getAllProducts() {
   const products = await  this.productsServise.getProducts();
   return products
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsServise.getSingleProduct(prodId);
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') prodid: string,
    @Body('title') productTitle: string,
    @Body('price') productPrice: number,
  ) {
    await this.productsServise.updateProduct(prodid, productTitle, productPrice);
    return null;
  }
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
   await this.productsServise.deleteProduct(prodId);
    return null;
  }
}
