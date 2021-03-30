import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  username:any;
  cart:any;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  goTo(){
    this.router.navigateByUrl("/login");

  }
  getCart(){
    this.us.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res["message"]
      },
      err=>{
        alert("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  }


  delete(n:number){
    let obj=this.cart[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteCartProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed from E-Commerce")
          this.router.navigateByUrl("/usercart")
        }}
        )
      }


      }
    
    

