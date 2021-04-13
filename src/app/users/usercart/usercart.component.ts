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

  userid:any;
  username:any;
  cart:any;
  name:any;
  check:any=[];
  unavail:any=[]
  products:any=[]
  amount:any;
  carts:any=[]
  productname: any=[];
  costs:any
  spinning:any=0
  constructor(private us:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.userid=localStorage.getItem("userid")
    this.username=localStorage.getItem("username")


   this.getCart();
        this.totalamount();
  }

  logout(){
    this.router.navigateByUrl("/home");
  }
  
  getCart(){

    this.us.getCartItems(this.userid).subscribe(
      res=>{
      if(res["message"]=="success")
      {
           this.spinning=1
        this.cart=res["product"]
        this.productname=res["product1"]
        for( let i in this.cart){
          for( let j in this.productname)
          {
            if(this.cart[i].productname==this.productname[j].pname)
            {
                   this.check.push(this.cart[i])
            }
          }
        }
       
        this.unavail=this.cart.filter((item: any) => this.check.indexOf(item) < 0)

       
        

        this.totalamount()
    }
        else{
          this.toastr.warning(res["message"])

          this.router.navigateByUrl("/login")

        }
      },
      err=>{
        this.toastr.warning('Something went wrong in adding Products');
        console.log(err)
      }
    )
  }

  
  
  delete(n:number){
    let obj4=this.check[n];
    this.us.deleteCartProduct(obj4).subscribe(
      res=>{
        if(res["message"]){
          this.toastr.success('product removed from usercart');
          setTimeout(function(){
            window.location.reload();
         }, 1000);        }
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
    if(this.userid!==null){
      let obj={
      userid:this.userid,
      productname:this.check[n].productname,

      colour:this.check[n].colour,
    
      cost:this.check[n].cost,
    
      productImgLink:this.check[n].productImgLink,

      quantity:this.check[n].quantity
      }
      
      this.us.placeOrder(obj).subscribe(
        res=>{
          if(res["message"]=="product exist"){

            this.toastr.warning('product is already added to placeOrder');
        
          }
          else
          {
            this.toastr.success('Product added to placeOrder');
            setTimeout(function(){
              window.location.reload();
           }, 1000);
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

           // this.toastr.success('Product deleted in usercart');
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
    
    }
   
    this.totalamount();

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
    this.costs=0;
        for(let i=0;i<this.cart.length;i++){
          let cost=this.cart[i].cost/this.cart[i].quantity;
          this.amount+=cost*this.cart[i].quantity
       
        }

        for(let i in this.unavail){
          this.costs= this.costs+this.unavail[i].cost
        }
        this.amount=this.amount-this.costs
  }
  

      }
    