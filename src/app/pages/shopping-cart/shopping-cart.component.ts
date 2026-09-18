import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartItem, CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

 constructor(private cartService:CartService){}

 displayCartItems(){
  return this.cartService.getCartItems()
 }

 deleteItem(item:Product){
  this.cartService.deleteProduct(item)
 }

 increaseQuantity(item: Product) {
  this.cartService.increaseQuantity(item);
 }

 decreaseQuantity(item: Product) {
  this.cartService.decreaseQuantity(item);
 }

  totalCartProducts(){
    return this.cartService.getTotalProducts()
  }

 totalCartPrice(){
  return this.cartService.getTotalCartPrice()
 }

 emptyCartItems(){
  this.cartService.clearCart()
 }

 trackByProductId(_: number, item: CartItem): number {
  return item.id;
 }
}
