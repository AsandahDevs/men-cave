import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomePageDataService } from 'src/app/services/home-page-data.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[ComponentsModule, HttpClientTestingModule],
      providers: [{
        provide: HomePageDataService,
        useValue: {
          getHomePage: () => of(null),
          getAnnouncementMedia: () => of([]),
          getFeaturedContentMedia: () => of([]),
        },
      }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
