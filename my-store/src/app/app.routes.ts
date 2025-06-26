import { Routes } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent, title: 'Products' },
  { path: 'product/:id', component: ProductItemDetailComponent, title: 'Product Detail' },
  { path: 'cart', component: CartComponent, title: 'Shopping Cart' },
  { path: 'confirmation', component: ConfirmationComponent, title: 'Order Confirmation' },
  { path: '**', redirectTo: 'products' }
];