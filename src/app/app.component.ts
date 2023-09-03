import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'men-cave';
  imageURL: string = '/../assets/images/manCave.png'

  constructor(public cartService:CartService){}

  totalCartProducts(){
    return this.cartService.getTotalProducts()
  }
}
