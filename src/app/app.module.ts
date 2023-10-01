import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

import { HomeModule } from './pages/home/home.module';
import { ProductsModule } from './pages/products/products.module';
import { NonExistantModule } from './pages/non-existant/non-existant.module';
import { ShoppingCartModule } from './pages/shopping-cart/shopping-cart.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginModule } from './pages/login/login.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdbCollapseModule,
    HomeModule,
    ProductsModule,
    NonExistantModule,
    ShoppingCartModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule { }
