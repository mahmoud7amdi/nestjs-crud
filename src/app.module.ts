/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './product/product.module';

@Module({
  imports: [ProductsModule,MongooseModule.forRoot(
    'mongodb+srv://mahmoud25:mahmoud25@mongodb-cource.3o6oq.mongodb.net/nestjs-learn?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
