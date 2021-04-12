import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {

  username:any;
  order:any;
  userid:any;
  constructor(private us:UserService,private router:Router,private ts:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.userid=localStorage.getItem("userid")

    this.getCart();
  }

  logout(){
    this.router.navigateByUrl("/home");
  }
  
  getCart(){
    this.us.getOrderItems(this.userid).subscribe(
      res=>{
        if(res["message"]=="success")
        {
        this.order=res["productList"]
        }
        else{
          this.ts.warning(res["message"])
          this.router.navigateByUrl("/login")
        }
      },
      err=>{

        this.ts.warning('Something went wrong in adding to myorders');
        
        console.log(err)
      }
    )
  }
  goTo(){
    this.router.navigateByUrl("/users/usercart")
  }


  delete(n:number){
    let obj5=this.order[n];
    this.us.deleteOrderProduct(obj5).subscribe(
      res=>{
        if(res["message"]){

          this.ts.success('Product removed from myorders') 
          setTimeout(function(){
            window.location.reload();
         }, 1000);

         // console.log("deleted successfully")

         //window.location.reload()

        }
      },
      err=>{
        this.ts.warning('Something went wrong in product deletion');
        console.log(err);
      }
    )

  }

}
