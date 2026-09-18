import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ProductComponent } from './product/product.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ProductComponent,
    SpinnerComponent,
    FooterComponent,
    ProductFiltersComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    ProductComponent,
    SpinnerComponent,
    FooterComponent,
    ProductFiltersComponent
  ]
})
export class ComponentsModule { }
