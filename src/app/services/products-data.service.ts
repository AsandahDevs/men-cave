import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

interface RichTextChild { text?: string; }
interface RichTextBlock { children?: RichTextChild[]; level?: number; type?: string; }
interface StrapiPage { slug?: string; Sectional_Content?: Array<{ __component: string; Page_Section_Content?: RichTextBlock[]; }>; }
interface StrapiPageResponse { data: StrapiPage[]; }
interface StrapiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  is_on_sale?: boolean;
  categories?: Array<{ name: string }>;
  image?: { url: string } | null;
}
interface StrapiProductResponse {
  data: StrapiProduct[];
  meta: { pagination: { page: number; pageCount: number; total: number; } };
}
interface StrapiCategoryResponse { data: Array<{ name: string }>; }

const pagePopulate = 'populate[Sectional_Content][on][page-components.page-sections][populate][Page_link]=true&populate[Sectional_Content][on][page-components.page-sections][populate][Page_Section_Media_Content]=true&fields=slug';

export interface ProductPage {
  products: Product[];
  page: number;
  pageCount: number;
  total: number;
  eyebrow?: string;
  headline?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsDataService {
  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number, searchTerm = '', category = 'All products', sort = 'name:asc'): Observable<ProductPage> {
    let params = new HttpParams()
      .set('populate', 'categories,image')
      .set('sort', sort)
      .set('pagination[page]', page)
      .set('pagination[pageSize]', pageSize);

    if (searchTerm.trim()) params = params.set('filters[name][$containsi]', searchTerm.trim());
    if (category !== 'All products') params = params.set('filters[categories][name][$eq]', category);

    return forkJoin({
      page: this.http.get<StrapiPageResponse>(this.pageUrl('products-page')),
      catalogue: this.http.get<StrapiProductResponse>('/api/products', { params }),
    }).pipe(map(({ page, catalogue }) => {
      const pageData = this.requirePage(page.data, 'products-page');
      const section = (pageData.Sectional_Content ?? []).find((item) => item.__component === 'page-components.page-sections');
      return {
        products: catalogue.data.map((product) => this.toProduct(product)),
        page: catalogue.meta.pagination.page,
        pageCount: catalogue.meta.pagination.pageCount,
        total: catalogue.meta.pagination.total,
        eyebrow: this.heading(section?.Page_Section_Content ?? [], 1),
        headline: this.heading(section?.Page_Section_Content ?? [], 2),
      };
    }));
  }

  getCategories(): Observable<string[]> {
    return this.http.get<StrapiCategoryResponse>('/api/categories?sort=name').pipe(
      map(({ data }) => data.map((category) => category.name))
    );
  }

  private pageUrl(slug: string): string {
    return `/api/pages?${pagePopulate}&filters[slug][$eq]=${encodeURIComponent(slug)}`;
  }

  private requirePage(pages: StrapiPage[], slug: string): StrapiPage {
    // Do not render another page's layout if a malformed API response contains
    // more than one result.
    const page = pages.find((candidate) => candidate.slug === slug);
    if (!page) throw new Error(`Strapi page with slug "${slug}" was not found.`);
    return page;
  }

  private toProduct(product: StrapiProduct): Product {
    return {
      id: product.id,
      title: product.name,
      price: product.price,
      description: product.description,
      category: product.categories?.[0]?.name ?? '',
      image: product.image?.url ?? '',
      sale: product.is_on_sale ?? false,
    };
  }

  private heading(blocks: RichTextBlock[], level: number): string {
    return (blocks.find((block) => block.type === 'heading' && block.level === level)?.children ?? []).map((child) => child.text ?? '').join('').trim();
  }
}
