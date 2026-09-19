import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomePageContent, HomePageDataService } from 'src/app/services/home-page-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  homePage: HomePageContent | null = null;
  loading = true;
  private homePageRequest?: Subscription;

  constructor(private homePageDataService: HomePageDataService) {}

  ngOnInit(): void {
    this.homePageRequest = this.homePageDataService.getHomePage().subscribe({
      next: (homePage) => {
        this.homePage = homePage;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Unable to load the home page from Strapi.', error);
      },
    });
  }

  trackBySection(_: number, section: { title: string }): string {
    return section.title;
  }

  trackByImageUrl(_: number, image: { url: string }): string {
    return image.url;
  }

  ngOnDestroy(): void {
    this.homePageRequest?.unsubscribe();
  }
}
