import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, forkJoin, of, Subscription } from 'rxjs';
import { AnnouncementMedia, HomePageContent, HomePageDataService } from 'src/app/services/home-page-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  homePage: HomePageContent | null = null;
  announcementMedia: AnnouncementMedia[] = [];
  featuredContentMedia: AnnouncementMedia[] = [];
  loading = true;
  private homePageRequest?: Subscription;

  constructor(private homePageDataService: HomePageDataService) {}

  ngOnInit(): void {
    this.homePageRequest = forkJoin({
      homePage: this.homePageDataService.getHomePage(),
      announcementMedia: this.homePageDataService.getAnnouncementMedia().pipe(
        catchError(() => of([])),
      ),
      featuredContentMedia: this.homePageDataService.getFeaturedContentMedia().pipe(
        catchError(() => of([])),
      ),
    }).subscribe({
      next: ({ homePage, announcementMedia, featuredContentMedia }) => {
        this.homePage = homePage;
        this.announcementMedia = announcementMedia;
        this.featuredContentMedia = featuredContentMedia;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  trackByImageUrl(_: number, image: { url: string }): string {
    return image.url;
  }

  ngOnDestroy(): void {
    this.homePageRequest?.unsubscribe();
  }
}
