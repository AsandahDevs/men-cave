import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface RichTextChild { text?: string; }
interface RichTextBlock { children?: RichTextChild[]; type?: string; }
interface StrapiMedia { alternativeText?: string | null; name?: string; url?: string; }
interface StrapiFooter { footer_content?: RichTextBlock[]; brand_logo?: StrapiMedia | null; }

export interface FooterContent { lines: string[]; logoUrl?: string; logoAlt: string; }

@Injectable({ providedIn: 'root' })
export class FooterDataService {
  constructor(private http: HttpClient) {}

  getFooter(): Observable<FooterContent> {
    return this.http.get<{ data: StrapiFooter }>('/api/footer?populate=brand_logo').pipe(map(({ data }) => ({
      lines: (data?.footer_content ?? [])
        .filter((block) => block.type === 'paragraph')
        .map((block) => (block.children ?? []).map((child) => child.text ?? '').join('').trim())
        .filter(Boolean),
      logoUrl: data?.brand_logo?.url,
      logoAlt: data?.brand_logo?.alternativeText || data?.brand_logo?.name || 'Men Cave',
    })));
  }
}
