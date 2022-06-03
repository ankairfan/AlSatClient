import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    DashboardModule


  ]

})
export class ComponentsModule { }
