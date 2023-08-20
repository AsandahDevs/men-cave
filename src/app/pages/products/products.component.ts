import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

import { ProductsDataService } from 'src/app/services/products-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  menswear$!: Subscription;
  loading!:boolean 
  message!:string
  constructor(private productService: ProductsDataService, public cartService:CartService) {}

  ngOnInit() {
    this.loading = true;
    this.message = 'Loading...';
    this.menswear$ = this.productService
      .getProducts()
      .subscribe({
        next: (data:any) => {
          this.loading = false;
          this.products = data
        },
        error: (error: any) => {
          console.log(error);
        },
      } );
  }

  addToCart(item:Product){
    console.log(item)
    this.cartService.addProduct(item)
  }

  ngOnDestroy() {
    this.menswear$.unsubscribe()
  }

}
