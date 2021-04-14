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
  spinning:any=0
  userCartSize:any;
  cart=null;
  category:any=[];
  pCategory:any;
  obj:any;
  cat:any=[];
  ctg:any;
  pro:any=[];
    status:boolean=false;

  //brands
  brand:any=[];
  brand1:any=[];
  brand2:any=[];
  userid:any;
  constructor(private us:UserService,private router:Router, private ts:ToastrService) { }
  ngOnInit(): void {
    this.userid=localStorage.getItem("userid")

    this.getAllProducts();
    this.cartStatus();
    
  }
  getOneProduct(j:any){
     this.pCategory= j
    this.us.getItem(this.pCategory).subscribe(
      res=>{
      
          localStorage.setItem("pCategory",this.pCategory)
          this.router.navigateByUrl("/category")
        

      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }
 
  
 onBrand(i:any){
  this.pCategory= i
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
        this.spinning=1

        this.products=res["message"]
        for (let i in this.products){
          this.category.push(this.products[i].pCategory)
          this.brand.push(this.products[i].pCategory,this.products[i].pbrand)

         }
         //for displaying unique values
         this.cat = this.category.filter((x:any, j:any, a:any) =>
         x && a.indexOf(x) === j);
         this.brand2 = this.brand.filter((x:any, j:any, a:any) =>
         x && a.indexOf(x) === j);
         
    
      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }
  wishList(n:any){
    if(this.userid){
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
    this.us.viewItem(viewObj).subscribe(
      res=>{
        if(res["message"]){
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
        this.us.getCartSubjectSize().subscribe(c=>{
          this.userCartSize=c;
        })
      
      },
      err=>{
        this.ts.warning("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }

  
  

  

}
