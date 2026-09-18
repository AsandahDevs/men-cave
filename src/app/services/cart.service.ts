import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'men-cave-cart';
  cart: CartItem[];

  constructor() {
    this.cart = this.loadCart();
  }

  clearCart(){
    this.cart = [];
    this.saveCart();
  }
  
  addProduct(item: Product) {
    const existingItem = this.cart.find((product) => product.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      this.saveCart();
      return;
    }

    this.cart.push({ ...item, quantity: 1 });
    this.saveCart();
  }

  getCartItems(): CartItem[] {
    return this.cart
  }

  getTotalProducts() {
    return this.cart.reduce((total, product) => total + product.quantity, 0);
  }

  deleteProduct(item:Product){
    this.cart = this.cart.filter(product=>product.id !== item?.id)
    this.saveCart();
  }

  increaseQuantity(item: Product) {
    const cartItem = this.cart.find((product) => product.id === item.id);
    if (cartItem) {
      cartItem.quantity += 1;
      this.saveCart();
    }
  }

  decreaseQuantity(item: Product) {
    const cartItem = this.cart.find((product) => product.id === item.id);
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      this.deleteProduct(item);
      return;
    }

    cartItem.quantity -= 1;
    this.saveCart();
  }

  getTotalCartPrice(){
   return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  private loadCart(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(this.storageKey);
      if (!storedCart) return [];

      const cart = JSON.parse(storedCart);
      return Array.isArray(cart)
        ? cart.filter((item): item is CartItem => this.isCartItem(item))
        : [];
    } catch {
      return [];
    }
  }

  private saveCart(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch {
      // The cart remains available for the current session if storage is unavailable.
    }
  }

  private isCartItem(item: unknown): item is CartItem {
    if (!item || typeof item !== 'object') return false;
    const candidate = item as Partial<CartItem>;
    return typeof candidate.id === 'number'
      && typeof candidate.title === 'string'
      && typeof candidate.price === 'number'
      && typeof candidate.category === 'string'
      && typeof candidate.description === 'string'
      && typeof candidate.image === 'string'
      && typeof candidate.quantity === 'number'
      && candidate.quantity > 0;
  }
}
