import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

interface RichTextChild { text?: string; }
interface RichTextBlock { children?: RichTextChild[]; level?: number; type?: string; }
interface StrapiProduct {
  id: number;
  product_name: string;
  product_price: number;
  product_desc: string;
  is_sale?: boolean;
  categories?: Array<{ name: string }>;
  product_image?: { url: string } | null;
}
interface StrapiPage { Footer?: { Footer_Content?: RichTextBlock[] }; Sectional_Content?: Array<{ __component: string; Page_Section_Content?: RichTextBlock[]; List_of_products?: StrapiProduct[]; }>; }
interface StrapiPageResponse { data: StrapiPage; }

// The products are now a nested field of the page-sections Dynamic Zone component.
const productsUrl = '/api/pages/fxaxny0bwywkw0dc6521qiek?populate[Sectional_Content][on][page-components.page-sections][populate][Page_link]=true&populate[Sectional_Content][on][page-components.page-sections][populate][Page_Section_Media_Content]=true&populate[Sectional_Content][on][page-components.page-sections][populate][List_of_products][populate][categories]=true&populate[Sectional_Content][on][page-components.page-sections][populate][List_of_products][populate][product_image]=true';

export interface ProductPage {
  products: Product[];
  page: number;
  pageCount: number;
  total: number;
  eyebrow: string;
  headline: string;
  footerLines: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService  {

  constructor( private http: HttpClient) { }

  getProducts(page: number, pageSize: number, searchTerm = '', category = 'All products'): Observable<ProductPage> {
    return this.http.get<StrapiPageResponse>(productsUrl).pipe(map(({ data }) => {
      const section = (data.Sectional_Content ?? []).find((item) => item.__component === 'page-components.page-sections');
      const allProducts = (section?.List_of_products ?? []).map((product) => this.toProduct(product));
      const term = searchTerm.trim().toLocaleLowerCase();
      const searchedProducts = term ? allProducts.filter((product) => `${product.title} ${product.description}`.toLocaleLowerCase().includes(term)) : allProducts;
      const filteredProducts = category === 'All products' ? searchedProducts : searchedProducts.filter((product) => product.category === category);
      const total = filteredProducts.length;
      const pageCount = Math.max(1, Math.ceil(total / pageSize));
      const currentPage = Math.min(Math.max(page, 1), pageCount);
      const start = (currentPage - 1) * pageSize;
      return { products: filteredProducts.slice(start, start + pageSize), page: currentPage, pageCount, total, eyebrow: this.heading(section?.Page_Section_Content ?? [], 1), headline: this.heading(section?.Page_Section_Content ?? [], 2), footerLines: this.paragraphs(data.Footer?.Footer_Content ?? []) };
    }));
  }

  getCategories(): Observable<string[]> {
    return this.http.get<StrapiPageResponse>(productsUrl).pipe(map(({ data }) => {
      const section = (data.Sectional_Content ?? []).find((item) => item.__component === 'page-components.page-sections');
      return [...new Set((section?.List_of_products ?? []).flatMap((product) => (product.categories ?? []).map((category) => category.name)))].sort();
    }));
  }

  private toProduct(product: StrapiProduct): Product {
    return {
      id: product.id,
      title: this.toSentenceCase(product.product_name),
      price: product.product_price,
      description: product.product_desc,
      category: product.categories?.[0]?.name ?? '',
      image: product.product_image?.url ?? '',
      sale: product.is_sale ?? false,
    };
  }

  private toSentenceCase(value: string): string {
    const normalized = value.trim().toLocaleLowerCase();
    return normalized ? normalized[0].toLocaleUpperCase() + normalized.slice(1) : normalized;
  }

  private heading(blocks: RichTextBlock[], level: number): string {
    return (blocks.find((block) => block.type === 'heading' && block.level === level)?.children ?? []).map((child) => child.text ?? '').join('').trim();
  }

  private paragraphs(blocks: RichTextBlock[]): string[] {
    return blocks.filter((block) => block.type === 'paragraph').map((block) => (block.children ?? []).map((child) => child.text ?? '').join('').trim()).filter(Boolean);
  }
}
