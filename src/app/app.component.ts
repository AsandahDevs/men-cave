import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Location } from '@angular/common';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'men-cave';
  imageURL: string = '/../assets/images/manCave.png'
  currentRoute: string = '';

  constructor(private cartService:CartService,private location:Location ){}

  ngOnInit() {
    this.currentRoute = this.location.path()
  }

  totalCartProducts(){
    return this.cartService.getTotalProducts()
  }
}
