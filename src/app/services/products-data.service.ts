import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService  {

  constructor( private http: HttpClient) { }

  getProducts() {
    return this.http.get("https://fakestoreapi.com/products/category/men's clothing")
  }
}
