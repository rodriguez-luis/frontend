import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {path: '', redirectTo: 'store', pathMatch: 'full'},
  {path: 'store', component: StoreComponent},
  {path: 'cart', component: CartComponent},
  {path: 'myorders', component: MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
