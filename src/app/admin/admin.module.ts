import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewadminproductsComponent } from './viewadminproducts/viewadminproducts.component';


@NgModule({
  declarations: [AdminComponent, ViewadminproductsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
