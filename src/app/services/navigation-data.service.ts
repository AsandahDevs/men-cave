import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface StrapiMedia { alternativeText?: string | null; name?: string; url?: string; }
interface StrapiNavLink {
  menu_name?: string;
  label?: string;
  title?: string;
  Link_Title?: string;
  url?: string;
  URL?: string;
  Link_URL?: string;
  external?: boolean;
  [field: string]: unknown;
}
interface StrapiNavMenu {
  brand_logo?: StrapiMedia | null;
  navlinks?: StrapiNavLink[];
}

export interface NavigationLink { label: string; url: string; external: boolean; }
export interface NavigationMenu { logoUrl?: string; logoAlt: string; links: NavigationLink[]; }

@Injectable({ providedIn: 'root' })
export class NavigationDataService {
  private readonly endpoint = '/api/navmenu?populate=brand_logo%2Cnavlinks';

  constructor(private http: HttpClient) {}

  getNavigation(): Observable<NavigationMenu> {
    return this.http.get<{ data: StrapiNavMenu }>(this.endpoint).pipe(map(({ data }) => ({
      logoUrl: data?.brand_logo?.url,
      logoAlt: data?.brand_logo?.alternativeText || data?.brand_logo?.name || 'Men Cave',
      links: (data?.navlinks ?? []).map((link) => this.toLink(link)).filter((link): link is NavigationLink => Boolean(link)),
    })));
  }

  private toLink(link: StrapiNavLink): NavigationLink | null {
    const label = this.stringField(link, ['menu_name', 'label', 'title', 'Link_Title']);
    const url = this.stringField(link, ['url', 'URL', 'Link_URL']);
    return label && url ? { label, url, external: Boolean(link.external) || /^https?:\/\//i.test(url) } : null;
  }

  private stringField(record: StrapiNavLink, fields: string[]): string | undefined {
    return fields.map((field) => record[field]).find((value): value is string => typeof value === 'string' && Boolean(value.trim()))?.trim();
  }
}
