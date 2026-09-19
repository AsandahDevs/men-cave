import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
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
  selectedSort = 'name:asc';
  searchTerm = '';
  currentPage = 1;
  readonly pageSize = 8;
  totalProducts = 0;
  totalPages = 1;
  eyebrow = 'The Men Cave collection';
  headline = 'Everyday essentials, well chosen.';
  private subscriptions = new Subscription();
  private searchTerms = new Subject<string>();
  private productRequest?: Subscription;
  loading = false;
  message = '';
  constructor(private productService: ProductsDataService, public cartService:CartService) {}

  ngOnInit() {
    this.subscriptions.add(this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(() => this.loadProducts()));

    this.loadProducts();

    this.subscriptions.add(this.productService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.log(error),
    }));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.searchTerms.next(searchTerm);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.loadProducts();
  }

  setSort(sort: string): void {
    this.selectedSort = sort;
    this.currentPage = 1;
    this.loadProducts();
  }

  setPage(page: number): void {
    const nextPage = Math.min(Math.max(page, 1), this.totalPages);
    if (nextPage === this.currentPage) return;
    this.currentPage = nextPage;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productRequest?.unsubscribe();
    this.loading = true;
    this.message = 'Loading products...';
    this.productRequest = this.productService
      .getProducts(this.currentPage, this.pageSize, this.searchTerm, this.selectedCategory, this.selectedSort)
      .subscribe({
        next: (result) => {
          this.products = result.products;
          this.totalProducts = result.total;
          this.totalPages = Math.max(1, result.pageCount);
          this.currentPage = result.page;
          this.eyebrow = result.eyebrow || this.eyebrow;
          this.headline = result.headline || this.headline;
          this.loading = false;
        },
        error: (error) => {
          this.products = [];
          this.totalProducts = 0;
          this.totalPages = 1;
          this.loading = false;
          this.message = 'Unable to load products.';
          console.log(error);
        },
      });
  }

  addToCart(item:Product){
    this.cartService.addProduct(item)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.productRequest?.unsubscribe();
  }

}
