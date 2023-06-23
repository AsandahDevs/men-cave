import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./pages/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: 'non-existant',
    loadChildren: () =>
      import('./pages/non-existant/non-existant.module').then(
        (m) => m.NonExistantModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
