import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from '../app.module';
import { RouteGuard } from '../route.guard';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UsersComponent } from './users.component';

const routes: Routes = [{ path:'', component: UsersComponent},
  {path:"usercart", component: UsercartComponent,canActivate :[RouteGuard]},
  {path:"userdashboard", component: UserdashboardComponent,canActivate :[RouteGuard]},
  {path:"placeorder",component:PlaceorderComponent,canActivate : [RouteGuard]}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
