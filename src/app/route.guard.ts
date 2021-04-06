import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private ts:ToastrService){}
  canActivate():boolean 
     {
       //check token in local storage
      let token=localStorage.getItem("token")
      //if token is not found , return true
      if (token==undefined){
        this.ts.warning("unauthorized access")
         return false;
      }
      //else return true
    return true;
  }
  
}
