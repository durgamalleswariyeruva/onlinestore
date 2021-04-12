import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  pro:any=[];
  img:any=[];
  imgs:any=[];
  status:boolean=false;

  //brands
  brand:any=[];
  brand1:any=[];
  brand2:any=[];
  userid:any;
  constructor(private us:UserService,private router:Router, private ts:ToastrService) { }
  ngOnInit(): void {
    //this.username=localStorage.getItem("username")
    this.userid=localStorage.getItem("userid")

    this.getAllProducts();
    this.cartStatus();
    
  }
  getOneProduct(j:any){
     this.pCategory= j
    console.log(this.pCategory)
    this.us.getItem(this.pCategory).subscribe(
      res=>{
       /* this.product=res["message"]
        this.status=true;
        this.ctg=this.product.pCategory
        console.log(this.ctg)
        console.log("cat:",this.product)*/
          localStorage.setItem("pCategory",this.pCategory)
          this.router.navigateByUrl("/category")
        

      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
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
      
     },
     err=>{
       this.ts.warning("Something went wrong in getting all products")
       console.log(err)
     }
   )
 }
  
 onBrand(i:any){
  this.pCategory= i
  console.log("category is:",this.pCategory)
  this.us.getItem(this.pCategory).subscribe(
    res=>{
      this.products1=res["message"]
      
    },
    err=>{
      this.ts.warning("Something went wrong in getting all products")
      console.log(err)
    }
  )
    
 }
  getAllProducts(){
    this.us.getProducts().subscribe(
      res=>{
        this.products=res["message"]
       // localStorage.setItem("productname",JSON.stringify(this.products))

        for (let i in this.products){
          this.category.push(this.products[i].pCategory)
          this.brand.push(this.products[i].pCategory,this.products[i].pbrand)

         }
         //for displaying unique values
         this.cat = this.category.filter((x:any, j:any, a:any) =>
         x && a.indexOf(x) === j);
         console.log(this.cat)
         this.brand2 = this.brand.filter((x:any, j:any, a:any) =>
         x && a.indexOf(x) === j);
         console.log(this.brand2)
         
    
      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }
  wishList(n:any){
    if(this.userid!==null){
      let obj={
      userid:this.userid,
      productname:this.products[n].pname,
      colour:this.products[n].pcol,
      cost:this.products[n].pprice,
      description:this.products[n].pdescription,
      quantity:this.products[n].pquantity,
      rate:this.products[n].prating,
      productImgLink:this.products[n].ImgLink
      }
      
      console.log("this new obj is ",obj)
      this.us.wishList(obj).subscribe(
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
          this.ts.warning("Something went wrong in Adding wishcart")
        console.log(err)
        }
      )
      
    }
    else{
      this.ts.warning("please login first to add items")
      this.router.navigateByUrl("/login")
    }

  }

  
  viewitem(n:number){
    
    let viewObj=this.products[n];
    console.log("viewobj",viewObj);
    this.us.viewItem(viewObj).subscribe(
      res=>{
        if(res["message"]){
         // localStorage.setItem("token",res["signedToken"])
          localStorage.setItem("pname",viewObj.pname)
          this.router.navigateByUrl("/viewcart");
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

  additems(n:number){
    if(this.userid!==null){
      let obj={
      userid:this.userid,
      productname:this.products[n].pname,
      colour:this.products[n].pcol,
      cost:this.products[n].pprice,
      description:this.products[n].pdescription,
      quantity:this.products[n].pquantity,
      rate:this.products[n].prating,
      productImgLink:this.products[n].ImgLink
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
          this.ts.warning("Something went wrong in Adding product")
        console.log(err)
        }
      )
      
    }
    else{
      this.ts.warning("please login first to add items")
      this.router.navigateByUrl("/login")
    }
  }
    
  additem(n:number){
    if(this.userid!==null){
      let obj={
      userid:this.userid,
      productname:this.product[n].pname,
      colour:this.product[n].pcol,
      cost:this.product[n].pprice,
      quantity:this.products[n].pquantity,
      rate:this.products[n].prating,
      description:this.product[n].pdescription,
      productImgLink:this.product[n].ImgLink
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
      this.ts.warning("please login first to add items")
      this.router.navigateByUrl("/login")
    }
  }


  

}
