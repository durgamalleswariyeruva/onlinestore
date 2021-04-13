import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';
  username:any;
  username1:any;
  products:any=[];
  searchTerm:any;
  userCartSize:number=0;
  token:any;
  userid:any
  constructor(private rt:Router, private us:UserService,private ts:ToastrService){}
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.userid=localStorage.getItem("userid")

    this.token=localStorage.getItem("token")
    this.cartStatus();

  }
  onRegister(){
    this.rt.navigateByUrl("/home")
 }
 getAllProducts(){
  this.us.getProducts().subscribe(
    res=>{
      this.products=res.message
    },
    err=>{
      this.ts.warning("Something went wrong in getting all products")
      console.log(err)
    }
  )
}
viewitem(i:any){
  this.rt.navigateByUrl("/home")
}
additem(i:any){
  this.rt.navigateByUrl("/home")

}

 logout(){
   localStorage.clear();
   
   this.rt.navigateByUrl("/home")
            .then(() => {
              window.location.reload();
            });
   

 }
 placeorder(){
  this.rt.navigateByUrl("/placeorder")
  .then(() => {
    window.location.reload();
  });


 }
 usercart(){
   this.rt.navigateByUrl("/usercart")
   .then(() => {
    window.location.reload();
  });

 }
 wishlist(){
   this.rt.navigateByUrl("users/wishlist")
   .then(() => {
    window.location.reload();
  });

 }
 cart(){
   this.rt.navigateByUrl("users/usercart")
 }
 cartStatus(){
  this.us.getCartSize(this.userid).subscribe(
    res=>{
      this.us.setCartSubjectSize(res["cartsize"])
      this.userCartSize=res["cartsize"];
      this.us.getCartSubjectSize().subscribe(c=>{
        this.userCartSize=c;
      })
     
    },
    err=>{
      this.ts.warning("Something went wrong in getting all products")
      console.log(err)
    }
  )


}

}
