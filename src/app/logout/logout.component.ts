import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  username:any
  constructor(private us:UserService,private rt:Router,private ts:ToastrService) { }

  ngOnInit(): void {
   this.username=localStorage.getItem(this.username)
   console.log("user is",this.username)
  }
  onRegister(){
    this.rt.navigateByUrl("/home")
 }
 logout(){

   localStorage.clear();

   this.rt.navigateByUrl("/home");
   this.ts.success("Logout successfully")
   //window.location.reload();


 }
}
