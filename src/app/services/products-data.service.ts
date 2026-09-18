import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiCategoryListResponse {
  data: Array<{ name: string }>;
}

export interface ProductPage {
  products: Product[];
  page: number;
  pageCount: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService  {

  constructor( private http: HttpClient) { }

  getProducts(page: number, pageSize: number, searchTerm = '', category = 'All products'): Observable<ProductPage> {
    let params = new HttpParams()
      .set('populate', 'image,categories')
      .set('pagination[page]', page)
      .set('pagination[pageSize]', pageSize);

    if (searchTerm.trim()) {
      params = params.set('filters[name][$containsi]', searchTerm.trim());
    }

    if (category !== 'All products') {
      params = params.set('filters[categories][name][$eq]', category);
    }

    return this.http
      .get<StrapiProductListResponse>('/api/products', { params })
      .pipe(map(({ data, meta }) => ({
        products: data.map((product) => this.toProduct(product)),
        page: meta.pagination.page,
        pageCount: meta.pagination.pageCount,
        total: meta.pagination.total,
      })));
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
