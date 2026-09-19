import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface RichTextChild { text?: string; }
interface RichTextBlock { children?: RichTextChild[]; type?: string; }
interface StrapiFooter { footer_content?: RichTextBlock[]; }

@Injectable({ providedIn: 'root' })
export class FooterDataService {
  constructor(private http: HttpClient) {}

  getFooterLines(): Observable<string[]> {
    return this.http.get<{ data: StrapiFooter }>('/api/footer').pipe(map(({ data }) =>
      (data?.footer_content ?? [])
        .filter((block) => block.type === 'paragraph')
        .map((block) => (block.children ?? []).map((child) => child.text ?? '').join('').trim())
        .filter(Boolean)
    ));
  }
}
