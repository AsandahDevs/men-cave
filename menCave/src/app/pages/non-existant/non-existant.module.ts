import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NonExistantRoutingModule } from './non-existant-routing.module';
import { NonExistantComponent } from './non-existant.component';


@NgModule({
  declarations: [
    NonExistantComponent
  ],
  imports: [
    CommonModule,
    NonExistantRoutingModule
  ]
})
export class NonExistantModule { }
