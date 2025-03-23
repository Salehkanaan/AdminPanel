import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { OrderformComponent } from './orders/orderform/order-form.component';
import { loginGuard } from './guard/login.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate:[loginGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [loginGuard] },
  { path: 'products/new', component: ProductFormComponent, canActivate: [loginGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [loginGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [loginGuard] },
  { path: 'orders/new', component: OrderformComponent, canActivate: [loginGuard] },
  { path: 'orders/edit/:id', component: OrderformComponent, canActivate: [loginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
