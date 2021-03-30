import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 searchTerm:any
  username:any;
  products:any;
  userCartSize:any;
  cart=null;
  constructor(private us:UserService,private router:Router) { }
  cat=["Television","laptop","Watches","Mobile phone"]
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getAllProducts();
    this.cartStatus();
    
  }

  
  getAllProducts(){
    this.us.getProducts().subscribe(
      res=>{
        this.products=res["message"]
      },
      err=>{
        alert("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }

  viewitem(n:number){
    
    let viewObj=this.products[n];
    console.log(viewObj);
    this.us.viewItem(viewObj).subscribe(
      res=>{
        if(res["message"]){
          localStorage.setItem("token",res["signedToken"])
          localStorage.setItem("productname",res["productname"])
          this.router.navigateByUrl("/view");
        }
      },
      err=>{
        alert("Something went wrong in getting details")
        console.log(err)
      }
    )
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

  additem(n:number){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.products[n].pname,
      colour:this.products[n].pcol,
      cost:this.products[n].pprice,
      description:this.products[n].pdescription,
      productImgLink:this.products[n].userImgLink
      }
      
      //console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]=="product exist"){
            alert("Product is already added to cart")
            
          }
          else{
            alert("Product added to cart")
            this.cartStatus();
          }
          
        },
        err=>{
          alert("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    
    else{
      alert("please login first to add items")
      this.router.navigateByUrl("/login")
    }
  }


  

}
