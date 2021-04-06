import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  username:any;
  cart:any;
  name:any;
 
  amount:any;
  constructor(private us:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    
    this.getCart();
    this.totalamount();
  }

  logout(){
    this.router.navigateByUrl("/home");
  }
  
  getCart(){
    this.us.getCartItems(this.username).subscribe(
      res=>{
      
        this.cart=res["message"]
        this.totalamount()
      },
      err=>{
        this.toastr.warning('Something went wrong in adding Products');
        console.log(err)
      }
    )
  }


  delete(n:number){
    let obj4=this.cart[n];
    this.us.deleteCartProduct(obj4).subscribe(
      res=>{
        if(res["message"]){
          this.toastr.success('product removed from usercart');
          this.router.navigateByUrl("/usercart").then(() => {​​​​​
            window.location.reload();
          }​​​​​);
        }
      },
      err=>{
        this.toastr.warning('Something went wrong in user creation');
        console.log(err);
      }
    )

  }

  goTo(){
    this.router.navigateByUrl("/login")
  }

  additem(n:number){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.cart[n].productname,

      colour:this.cart[n].colour,
    
      cost:this.cart[n].cost,
    
      productImgLink:this.cart[n].productImgLink,

      quantity:this.cart[n].quantity
      }
      
      //console.log("this new obj is ",obj)
      this.us.placeOrder(obj).subscribe(
        res=>{
          if(res["message"]=="product exist"){

            this.toastr.warning('product is already added to placeOrder');
        
          }
          else
          {
            this.toastr.success('Product added to placeOrder');
             this.router.navigateByUrl("/usercart").then(() => {​​​​​
              window.location.reload();
            }​​​​​);
          }
         
        },
        err=>{
          this.toastr.warning('Something went wrong in adding order');
        console.log(err)
        }
         

        
      )

     this.us.deleteOrder1(obj).subscribe(
        res=>{
          if(res["message"]){

            this.toastr.success('Product deleted in usercart');
          }
        },
        err=>{
          this.toastr.warning('Something went wrong in order deletion');
          console.log(err);
        }
      )
  
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }
  
  incr(p:any){
    if(p.quantity){
      let cost=p.cost/p.quantity;
    p.quantity+=1;

    p.cost=p.quantity*cost;
    this.totalamount();
    }

  }
  decr(p:any){
    if(p.quantity!=1){
      let cost=p.cost/p.quantity;
      p.quantity-=1;
      
      p.cost=p.quantity*cost;
      this.totalamount();
      }
  
  }





  totalamount(){
    this.amount=0;
        for(let i=0;i<this.cart.length;i++){
          let cost=this.cart[i].cost/this.cart[i].quantity;
          this.amount+=cost*this.cart[i].quantity

       
        }
  }
  

      }
    
    

