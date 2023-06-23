import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonExistantComponent } from './non-existant.component';

const routes: Routes = [{ path: '', component: NonExistantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonExistantRoutingModule { }
