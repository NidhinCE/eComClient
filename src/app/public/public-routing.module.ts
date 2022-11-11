import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './components/categories/add-categories/add-categories.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/mycart/cart/cart.component';
import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { ProductsComponent } from './components/products/products/products.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { UsersComponent } from './components/users/users/users.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: 'public', component: PublicComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/add', component: AddCategoriesComponent},
      { path: 'categories/update', component:AddCategoriesComponent},
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: AddProductsComponent},
      { path: 'products/update', component:AddProductsComponent},
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUsersComponent},
      { path: 'users/update', component:AddUsersComponent},
      { path: 'cart', component: CartComponent },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'cart/add', component: ProductsComponent},
      { path: 'cart/update', component:ProductsComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'logout', component: LogoutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
