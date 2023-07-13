import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/interfaces/product';

import { ProductsDataService } from 'src/app/services/products-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  menswear$!: Subscription
  constructor(private productService: ProductsDataService) {}

  ngOnInit() {
    this.menswear$ = this.productService
      .getProducts()
      .subscribe({
        next: (data:any) => {
          this.products = data
          console.log(this.products)
        },
        error: (error: any) => {
          console.log(error);
        },
      } );
  }

  ngOnDestroy() {
    this.menswear$.unsubscribe()
  }

}
