import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

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

  totalCartProducts(){
    return this.cartService.getTotalProducts()
  }

 totalCartPrice(){
  return this.cartService.getTotalCartPrice()
 }

 emptyCartItems(){
  this.cartService.clearCart()
 }
}
