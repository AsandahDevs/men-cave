import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface RichTextChild { children?: RichTextChild[]; text?: string; type?: string; url?: string; }
interface RichTextBlock { children?: RichTextChild[]; level?: number; type?: string; }
interface StrapiMedia { alternativeText?: string | null; name: string; url: string; }
interface PageSection { __component: 'page-components.page-sections'; Page_Section_Content?: RichTextBlock[]; Page_link?: { Link_Title?: string } | null; Page_Section_Media_Content?: StrapiMedia[]; }
interface StrapiPage { Footer?: { Footer_Content?: RichTextBlock[] } | null; Sectional_Content?: PageSection[]; }
interface StrapiPageResponse { data: StrapiPage; }

export interface AnnouncementMedia { url: string; alt: string; }
export interface HomeSection { title: string; paragraphs: string[]; link?: { label: string; url: string }; media: AnnouncementMedia[]; }
export interface HomePageContent { brandTitle: string; headline: string; description: string; ctaLabel: string; ctaUrl: string; heroMedia?: AnnouncementMedia; sections: HomeSection[]; footerLines: string[]; }

// Fragment population is required for media and components nested in a Dynamic Zone.
const homepageUrl = '/api/pages/o27erjqex7yq5810dnvfqud0?populate[Sectional_Content][on][page-components.page-sections][populate][Page_link]=true&populate[Sectional_Content][on][page-components.page-sections][populate][Page_Section_Media_Content]=true';

@Injectable({ providedIn: 'root' })
export class HomePageDataService {
  constructor(private http: HttpClient) {}

  getHomePage(): Observable<HomePageContent> {
    return this.http.get<StrapiPageResponse>(homepageUrl).pipe(map(({ data }) => this.toHomePageContent(data)));
  }

  private toHomePageContent(page: StrapiPage): HomePageContent {
    const sections = (page.Sectional_Content ?? []).filter((section) => section.__component === 'page-components.page-sections').map((section) => this.toSection(section));
    const [hero, ...contentSections] = sections;
    return { brandTitle: hero?.title ?? '', headline: this.heading(page.Sectional_Content?.[0]?.Page_Section_Content ?? [], 2), description: hero?.paragraphs[0] ?? '', ctaLabel: hero?.link?.label ?? '', ctaUrl: hero?.link?.url ?? '', heroMedia: hero?.media[0], sections: contentSections, footerLines: this.paragraphs(page.Footer?.Footer_Content ?? []) };
  }

  private toSection(section: PageSection): HomeSection {
    const content = section.Page_Section_Content ?? [];
    const url = this.firstLinkUrl(content);
    const label = section.Page_link?.Link_Title?.trim();
    return { title: this.firstHeading(content), paragraphs: this.paragraphs(content), link: label && url ? { label, url } : undefined, media: (section.Page_Section_Media_Content ?? []).map((media) => ({ url: media.url, alt: media.alternativeText || media.name })) };
  }

  private firstHeading(blocks: RichTextBlock[]): string { return this.text(blocks.find((block) => block.type === 'heading')?.children ?? []); }
  private heading(blocks: RichTextBlock[], level: number): string { return this.text(blocks.find((block) => block.type === 'heading' && block.level === level)?.children ?? []); }
  private paragraphs(blocks: RichTextBlock[]): string[] {
    return blocks.filter((block) => block.type === 'paragraph').map((block) => this.text(block.children ?? [])).filter(Boolean);
  }
  private firstLinkUrl(blocks: RichTextBlock[]): string | undefined { for (const block of blocks) for (const child of block.children ?? []) if (child.type === 'link' && child.url) return child.url; return undefined; }
  private text(children: RichTextChild[]): string { return children.map((child) => child.text ?? this.text(child.children ?? [])).join('').trim(); }
}
