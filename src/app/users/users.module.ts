import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';


@NgModule({
  declarations: [UsersComponent, UsercartComponent, UserdashboardComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
