import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private rt:Router, private us:UserService){}
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    
    console.log("username is", this.username)
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
      alert("Something went wrong in getting all products")
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
 cart(){
   this.rt.navigateByUrl("users/usercart")
 }
 cartStatus(){
  this.us.getCartSize(this.username).subscribe(
    res=>{
      this.us.setCartSubjectSize(res["cartsize"])
      this.userCartSize=res["cartsize"];
      console.log(this.userCartSize)
      this.us.getCartSubjectSize().subscribe(c=>{
        this.userCartSize=c;
      })
      localStorage.setItem("userCart",JSON.stringify(res["userCart"]))

     // window.location.reload()
    },
    err=>{
      alert("Something went wrong in getting all products")
      console.log(err)
    }
  )


}

}
