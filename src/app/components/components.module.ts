import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ProductComponent } from './product/product.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ProductComponent,
    SpinnerComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    ProductComponent,
    SpinnerComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
