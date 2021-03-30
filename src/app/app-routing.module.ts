import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';


const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"home", component:HomeComponent},
  {path:"footer", component:FooterComponent},
  {path:"logout",component:LogoutComponent},
  {path:"reset",component:ResetComponent},
  {path:"", redirectTo:"/register", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
