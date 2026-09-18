import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface RichTextChild { children?: RichTextChild[]; text?: string; type?: string; url?: string; }
interface RichTextBlock { type: string; level?: number; children: RichTextChild[]; }
interface StrapiImage { name: string; alternativeText?: string | null; url: string; }
interface StrapiHomepage {
  hero_section: RichTextBlock[];
  about: RichTextBlock[];
  featured_content: RichTextBlock[];
  contact_us: RichTextBlock[];
  announcements: RichTextBlock[];
}
interface StrapiHomepageResponse { data: StrapiHomepage[]; }
interface StrapiMediaCollection { media?: StrapiImage[]; }
interface StrapiMediaCollectionResponse { data: StrapiMediaCollection[]; }

export interface HomePageContent {
  brandTitle: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  aboutTitle: string;
  aboutDescription: string;
  featuredTitle: string;
  featuredDescription: string;
  contactTitle: string;
  contactDetails: string[];
  announcementsTitle: string;
  announcementsDescription: string;
}

export interface AnnouncementMedia {
  url: string;
  alt: string;
}

@Injectable({ providedIn: 'root' })
export class HomePageDataService {
  constructor(private http: HttpClient) {}

  getHomePage(): Observable<HomePageContent | null> {
    return this.http.get<StrapiHomepageResponse>('/api/homepages')
      .pipe(map(({ data }) => data[0] ? this.toHomePageContent(data[0]) : null));
  }

  getAnnouncementMedia(): Observable<AnnouncementMedia[]> {
    return this.getMedia('/api/announcements-medias?populate=media');
  }

  getFeaturedContentMedia(): Observable<AnnouncementMedia[]> {
    return this.getMedia('/api/featured-content-medias?populate=media');
  }

  private toHomePageContent(homePage: StrapiHomepage): HomePageContent {
    const heroLink = homePage.hero_section.flatMap((block) => block.children).find((child) => child.type === 'link');
    return {
      brandTitle: this.heading(homePage.hero_section, 1),
      headline: this.heading(homePage.hero_section, 2),
      description: this.paragraphs(homePage.hero_section)[0] ?? '',
      ctaLabel: this.text(heroLink?.children ?? []),
      ctaUrl: heroLink?.url ?? '',
      aboutTitle: this.heading(homePage.about, 3),
      aboutDescription: this.paragraphs(homePage.about).join(' '),
      featuredTitle: this.heading(homePage.featured_content, 3),
      featuredDescription: this.paragraphs(homePage.featured_content).join(' '),
      contactTitle: this.heading(homePage.contact_us, 3),
      contactDetails: this.paragraphs(homePage.contact_us),
      announcementsTitle: this.heading(homePage.announcements, 3),
      announcementsDescription: this.paragraphs(homePage.announcements).join(' '),
    };
  }

  private getMedia(url: string): Observable<AnnouncementMedia[]> {
    return this.http
      .get<StrapiMediaCollectionResponse>(url)
      .pipe(map(({ data }) => data.flatMap((collection) =>
        (collection.media ?? []).map((media) => ({
          url: media.url,
          alt: media.alternativeText || media.name,
        }))
      )));
  }

  private heading(blocks: RichTextBlock[], level: number): string {
    return this.text(blocks.find((block) => block.type === 'heading' && block.level === level)?.children ?? []);
  }

  private paragraphs(blocks: RichTextBlock[]): string[] {
    return blocks.filter((block) => block.type === 'paragraph').map((block) => this.text(block.children)).filter(Boolean);
  }

  private text(children: RichTextChild[]): string {
    return children.map((child) => child.text ?? '').join('').trim();
  }
}
