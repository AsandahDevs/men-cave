import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Location } from '@angular/common';  
import { Subscription } from 'rxjs';
import { NavigationDataService, NavigationMenu } from './services/navigation-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'men-cave';
  imageURL: string = '/../assets/images/manCave.png'
  currentRoute: string = '';
  navigation: NavigationMenu | null = null;
  private navigationRequest?: Subscription;

  constructor(private cartService:CartService, private location:Location, private navigationData: NavigationDataService){}

  ngOnInit() {
    this.currentRoute = this.location.path()
    this.navigationRequest = this.navigationData.getNavigation().subscribe({
      next: (navigation) => this.navigation = navigation,
      error: (error) => console.error('Unable to load navigation from Strapi.', error),
    });
  }

  ngOnDestroy(): void { this.navigationRequest?.unsubscribe(); }

  totalCartProducts(){
    return this.cartService.getTotalProducts()
  }
}
