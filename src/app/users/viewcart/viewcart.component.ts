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
  userCartSize:any;
  pname:any;
  product:any;
  _id:any;
  constructor(private us:UserService, private router:Router,private ts:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.pname=localStorage.getItem("pname")
    //console.log("PRODUCT NAME IS ",this.pname)
    this.getProduct();
  }
  back(){
    this.router.navigateByUrl("/home")
  }
  getProduct(){
    this.us.getProduct(this.pname).subscribe(
      res=>{
        this.product=res["message"]
       // console.log("the view product is",this.product)
      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
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
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }

  additem(i:any){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.product[i].pname,
      colour:this.product[i].pcol,
      cost:this.product[i].pprice,
      quantity:this.product[i].pquantity,
      rate:this.product[i].prating,
      description:this.product[i].pdescription,
      productImgLink:this.product[i].ImgLink
      }
      
      console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]=="product exist"){
            this.ts.warning("Product is already added to cart")
            
          }
          else{
            this.ts.success("Product added to cart")
            this.cartStatus();
          }
          
        },
        err=>{
          this.ts.warning("Something went wrong in Adding cart")
        console.log(err)
        }
      )
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }


}

