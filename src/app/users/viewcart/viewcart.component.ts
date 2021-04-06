import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {

  username:any;
  pname:any;
  product:any;
  constructor(private us:UserService, private router:Router,private ts:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.pname=localStorage.getItem("pname")
    console.log("PRODUCT NAME IS ",this.pname)
    this.getProduct();
  }
  back(){
    this.router.navigateByUrl("/home")
  }
  getProduct(){
    this.us.getProduct(this.pname).subscribe(
      res=>{
        this.product=res["message"]
        console.log("the wish product product is",this.product)
      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }
  additem(){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.product.pname,
      productID:this.product.productID,
      colour:this.product.colour,
      quantity:this.product.pquantity,
      rate:this.product.prating,
      mfddate:this.product.mfddate,
      cost:this.product.cost,
      description:this.product.description,
      productImgLink:this.product.productImgLink
      }
      
      //console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]){
            this.ts.success(" Product added to cart")
          this.router.navigateByUrl("/usercart")
          }
        },
        err=>{
          this.ts.warning("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }


}

