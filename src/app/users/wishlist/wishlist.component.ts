import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private us:UserService,private router:Router,private ts:ToastrService) { }
  userid:any;
  username:any;
  products:any=[];
  userCartSize:any;
  ngOnInit(): void {
  //  this.username=localStorage.getItem("username")
    this.userid=localStorage.getItem("userid")

  this.getwishlist();
    this.cartStatus();
  }
  getwishlist(){
    this.us.getwishlist(this.userid).subscribe(
      res=>{

        if(res["message"]=="success")
        {

        this.products=res["productList"]
        }

        else{
          this.ts.warning(res["message"])
          this.router.navigateByUrl("/login")
        }
      }
    )
  }
  cartStatus(){
    this.us.getCartSize(this.userid).subscribe(
      res=>{
        this.us.setCartSubjectSize(res["cartsize"])
        this.userCartSize=res["cartsize"];
        console.log(this.userCartSize)
        this.us.getCartSubjectSize().subscribe(c=>{
          this.userCartSize=c;
        })
       // localStorage.setItem("userCart",JSON.stringify(res["userCart"]))

       // window.location.reload()
      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }
  back(){
    this.router.navigateByUrl("/home")
  }
  deleteList(n:any){
    let obj=this.products[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteWishProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          this.ts.success("Product removed from wishing cart")
          window.location.reload()
        }}
        )
      }
  
  additems(n:number){
    console.log("hello",this.products[n])
    if(this.userid!==null){
      let obj={
      userid:this.userid,
      productname:this.products[n].productname,
      colour:this.products[n].colour,
      cost:this.products[n].cost,
      quantity:this.products[n].quantity,
      rate:this.products[n].rate,
      description:this.products[n].description,
      productImgLink:this.products[n].productImgLink
      }
      
      console.log("this new wish obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]=="product exist"){
            this.ts.warning("Product is already added to wishcart")
            
          }
          else{
            this.ts.success("Product added to wishcart")
            this.cartStatus();
          }
          
        },
        err=>{
          this.ts.warning("Something went wrong in Adding product to wishcart")
        console.log(err)
        }
      )
      
    }
    
    else{
      this.ts.warning("please login first to add items to wishcart")
      this.router.navigateByUrl("/login")
    }
  }
}
