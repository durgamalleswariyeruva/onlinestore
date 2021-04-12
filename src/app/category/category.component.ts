import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  username: any;
  pCategory: any;
  product:any;
  status:boolean=false
  ctg:any
  userCartSize:any;
  userid:any;
  constructor( private us:UserService,private rt:Router ,private ts:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.userid=localStorage.getItem("userid")
    this.pCategory=localStorage.getItem("pCategory")
    this.getProduct();
    this.cartStatus();
  }
   onBack(){
     this.rt.navigateByUrl("/home")
   }
  getProduct(){
    this.us.getItem(this.pCategory).subscribe(
      res=>{
        this.product=res["message"]
        this.status=true;
        this.ctg=this.product.pCategory
        

      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)

      }
    )
  }
  viewitem(i:any){
    let viewObj=this.product[i];
    this.us.viewItem(viewObj).subscribe(
      res=>{
        if(res["message"]){
          localStorage.setItem("pname",viewObj.pname)
          this.rt.navigateByUrl("/viewcart");
        }
      },
      err=>{
        this.ts.warning("Something went wrong in getting details")
        console.log(err)
      }
    )
  }
  cartStatus(){
    this.us.getCartSize(this.userid).subscribe(
      res=>{
        this.us.setCartSubjectSize(res["cartsize"])
        this.userCartSize=res["cartsize"];
        this.us.getCartSubjectSize().subscribe(c=>{
          this.userCartSize=c;
        })

       // window.location.reload()
      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }
  additem(n:number){
    if(this.userid!==null){
      let obj={
      userid:this.userid,
      productname:this.product[n].pname,
      colour:this.product[n].pcol,
      cost:this.product[n].pprice,
      description:this.product[n].pdescription,
      productImgLink:this.product[n].ImgLink
      }
      
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
          this.ts.warning("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    
    else{
      this.ts.warning("please login first to add items")
      this.rt.navigateByUrl("/login")
    }
  }

}
