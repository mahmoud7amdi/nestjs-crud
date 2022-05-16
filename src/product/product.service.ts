/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
    ){}

  async insertProduct(title: string, price: number) {
    //const prodId = Math.random().toString();
    const newProduct = new this.productModel({
      title,
      price
    });
   const result = await newProduct.save();
   console.log(result)
   return result.id as string;
  }
  async getProducts() {
    const products = await this.productModel.find().exec()
    return products.map(prod=> ({
      id:prod.id,
      title:prod.title,
      price:prod.price
    }));
  }
  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);

    return { id: product.id ,title:product.title,price:product.price};
  }
  async updateProduct(
    productId: string,
    title: string, 
    price: number
    ) {
    const updateProduct = await this.findProduct(productId);
    if (title) {
      updateProduct.title = title;
    }
    if (price) {
      updateProduct.price = price;
    }
    updateProduct.save();
  }
 
  async deleteProduct(prrodId: string) {
    await this.productModel.deleteOne({_id: prrodId}).exec()
}
private async findProduct(id: string): Promise<Product> {
  let product ;
  try{
    product = await this.productModel.findById(id).exec()
  }catch(error){
    throw new NotFoundException('could not fount product')
  }
  if (!product) {
    throw new NotFoundException('could not fount product');
  }
  return product ;
}
}