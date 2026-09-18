import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  categories: string[] = [];
  selectedCategory = 'All products';
  searchTerm = '';
  private subscriptions = new Subscription();
  loading = false;
  message = '';
  constructor(private productService: ProductsDataService, public cartService:CartService) {}

  ngOnInit() {
    this.loading = true;
    this.message = 'Loading...';
    this.subscriptions.add(this.productService
      .getProducts()
      .subscribe({
        next: (data:any) => {
          this.loading = false;
          this.products = data
        },
        error: (error: any) => {
          this.loading = false;
          this.message = 'Unable to load products.';
          console.log(error);
        },
      }));

    this.subscriptions.add(this.productService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.log(error),
    }));
  }

  get filteredProducts(): Product[] {
    const search = this.searchTerm.trim().toLocaleLowerCase();

    return this.products.filter((product) => {
      const matchesCategory = this.selectedCategory === 'All products'
        || product.category === this.selectedCategory;
      const searchableText = `${product.title} ${product.description} ${product.category}`.toLocaleLowerCase();
      return matchesCategory && (!search || searchableText.includes(search));
    });
  }

  addToCart(item:Product){
    this.cartService.addProduct(item)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
