import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ProductsDataService } from 'src/app/services/products-data.service';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ComponentsModule,
    HttpClientModule,
  ],
  providers:[HttpClient,ProductsDataService]
  
})
export class ProductsModule { }
