import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Product[] = [];
  product!:Product

  clearCart(){
    this.cart = [];
  }
  
  addProduct(item: Product){
    this.cart.push(item);
  }

  getCartItems(){
    return this.cart
  }

  getTotalProducts(){
    return this.cart.length
  }

  deleteProduct(item:Product){
    this.cart = this.cart.filter(product=>product.id !== item?.id)
  }

  getTotalCartPrice(){
   const cartPrices = this.cart.map(product=>product.price)
   return cartPrices.reduce((previousPrice,currentPrice)=> previousPrice + currentPrice,0 );
  }
}
