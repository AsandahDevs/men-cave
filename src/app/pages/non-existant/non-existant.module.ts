import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NonExistantRoutingModule } from './non-existant-routing.module';
import { NonExistantComponent } from './non-existant.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    NonExistantComponent
  ],
  imports: [
    CommonModule,
    NonExistantRoutingModule,
    ComponentsModule
  ]
})
export class NonExistantModule { }
