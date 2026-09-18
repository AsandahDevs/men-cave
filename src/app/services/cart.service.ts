import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];

  clearCart(){
    this.cart = [];
  }
  
  addProduct(item: Product) {
    const existingItem = this.cart.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      return;
    }

    this.cart.push({ ...item, quantity: 1 });
  }

  getCartItems(): CartItem[] {
    return this.cart
  }

  getTotalProducts() {
    return this.cart.reduce((total, product) => total + product.quantity, 0);
  }

  deleteProduct(item:Product){
    this.cart = this.cart.filter(product=>product.id !== item?.id)
  }

  increaseQuantity(item: Product) {
    const cartItem = this.cart.find((product) => product.id === item.id);
    if (cartItem) cartItem.quantity += 1;
  }

  decreaseQuantity(item: Product) {
    const cartItem = this.cart.find((product) => product.id === item.id);
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      this.deleteProduct(item);
      return;
    }

    cartItem.quantity -= 1;
  }

  getTotalCartPrice(){
   return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }
}
