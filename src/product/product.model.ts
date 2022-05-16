/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose'
export const productSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  price: { 
    type: Number, 
    required: true
  }
})

export interface Product extends mongoose.Document {
  id: string,
  title: string,
  price: number
    
}
