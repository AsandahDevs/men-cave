import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

interface StrapiMedia {
  url: string;
}

interface StrapiProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: StrapiMedia[];
  categories?: Array<{ name: string }>;
}

interface StrapiProductListResponse {
  data: StrapiProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService  {

  constructor( private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<StrapiProductListResponse>('/api/products?populate=image,categories')
      .pipe(map(({ data }) => data.map((product) => this.toProduct(product))));
  }

  private toProduct(product: StrapiProduct): Product {
    return {
      id: product.id,
      title: product.name,
      price: product.price,
      description: product.description,
      category: product.categories?.[0]?.name ?? '',
      image: product.image?.[0]?.url ?? '',
    };
  }
}
