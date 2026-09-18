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
  sale?: boolean;
  image?: StrapiMedia[];
  categories?: Array<{ name: string }>;
}

interface StrapiProductListResponse {
  data: StrapiProduct[];
}

interface StrapiCategoryListResponse {
  data: Array<{ name: string }>;
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

  getCategories(): Observable<string[]> {
    return this.http
      .get<StrapiCategoryListResponse>('/api/categories?sort=name')
      .pipe(map(({ data }) => data.map((category) => category.name)));
  }

  private toProduct(product: StrapiProduct): Product {
    return {
      id: product.id,
      title: this.toSentenceCase(product.name),
      price: product.price,
      description: product.description,
      category: product.categories?.[0]?.name ?? '',
      image: product.image?.[0]?.url ?? '',
      sale: product.sale ?? false,
    };
  }

  private toSentenceCase(value: string): string {
    const normalized = value.trim().toLocaleLowerCase();
    return normalized ? normalized[0].toLocaleUpperCase() + normalized.slice(1) : normalized;
  }
}
