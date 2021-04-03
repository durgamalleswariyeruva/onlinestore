import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewadminproductsComponent } from './viewadminproducts/viewadminproducts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatedetailsComponent } from './updatedetails/updatedetails.component';


@NgModule({
  declarations: [AdminComponent, ViewadminproductsComponent, UpdatedetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
