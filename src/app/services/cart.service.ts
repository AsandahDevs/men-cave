import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Product[] = [];

  addProduct(item: Product){
    this.cart.push(item);
  }

  getCartItems(){
    return this.cart
  }

  getTotalProducts(){
    return this.cart.length
  }
}