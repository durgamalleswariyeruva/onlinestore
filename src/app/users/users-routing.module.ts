import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsercartComponent } from './usercart/usercart.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UsersComponent } from './users.component';

const routes: Routes = [{ path: 'users', component: UsersComponent },
{path:"usercart", component: UsercartComponent},
{path:"userdashboard", component: UserdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
