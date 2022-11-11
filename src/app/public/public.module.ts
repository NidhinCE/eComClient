//Holds all the public files, ie everything that has to be accessed for a non registered users
//such as login, 404, presentational page, about us. 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { AddCategoriesComponent } from './components/categories/add-categories/add-categories.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';

import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { UsersComponent } from './components/users/users/users.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { CartComponent } from './components/mycart/cart/cart.component';
import { ProductsComponent } from './components/products/products/products.component';
import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    PublicComponent,
    DashboardComponent,
    SidebarComponent,
    ConfirmationDialogComponent,
    CategoriesComponent,
    AddCategoriesComponent,
    AddProductsComponent,
    UsersComponent,
    AddUsersComponent,
    CartComponent,
    ProductsComponent,
    MyOrdersComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    PublicRoutingModule,
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatCardModule,
  ]
})
export class PublicModule { }
