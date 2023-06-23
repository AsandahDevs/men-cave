import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ProductComponent } from './product/product.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ProductComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ComponentsModule { }
