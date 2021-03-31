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
 selectedLevel:any;
  username:any;
  products:any;
  product:any;
  products1:any;

  userCartSize:any;
  cart=null;
  category:any=[];
  pCategory:any;
  obj:any;
  cat:any=[];
  ctg:any;
  status:boolean=false;
  constructor(private us:UserService,private router:Router) { }
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getAllProducts();
    this.cartStatus();
    
  }
  getOneProduct(j:any){
     this.pCategory= j
    console.log(this.pCategory)
    this.us.getItem(this.pCategory).subscribe(
      res=>{
        this.product=res["message"]
        this.status=true;
        this.ctg=this.product.pCategory
        console.log(this.ctg)
        console.log("cat:",this.product)
        
      },
      err=>{
        alert("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }
  getOneProducts(j:any){
    this.pCategory= j
   console.log(this.pCategory)
   this.us.getItem(this.pCategory).subscribe(
     res=>{
       this.products1=res["message"]
       
       console.log("cat:",this.products1)
       
     },
     err=>{
       alert("Something went wrong in getting all products")
       console.log(err)
     }
   )
 }
  
  getAllProducts(){
    this.us.getProducts().subscribe(
      res=>{
        this.products=res["message"]
        for (let i in this.products){
          this.category.push(this.products[i].pCategory)
      
         }
         //for displaying unique values
         this.cat = this.category.filter((x:any, j:any, a:any) =>
         x && a.indexOf(x) === j);
         console.log(this.cat)
    
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
      productImgLink:this.products[n].ImgLink
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
