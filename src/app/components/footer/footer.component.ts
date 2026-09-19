import { Component, Input, OnInit } from '@angular/core';
import { FooterDataService } from 'src/app/services/footer-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() lines: string[] = [];
  logoUrl?: string;
  logoAlt = 'Men Cave';
  date = new Date();

  constructor(private footerData: FooterDataService) {}

  ngOnInit(): void {
    this.footerData.getFooter().subscribe({
      next: (footer) => {
        this.lines = footer.lines;
        this.logoUrl = footer.logoUrl;
        this.logoAlt = footer.logoAlt;
      },
      error: (error) => console.error('Unable to load footer from Strapi.', error),
    });
  }
}
