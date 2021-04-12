import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCartSize:any;
  constructor(private hc:HttpClient) { }

  //user registration
  createUser(userObj:any):Observable<any>{
    return this.hc.post("/user/registration",userObj)
  }

  loginUser(userCredObj:any):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }
  changePassword(obj:any):Observable<any>{
    console.log("obj3 is",obj)
    return this.hc.post("/user/resetpassword",obj);
    
  }
  
  userscount():Observable<any>{
    return this.hc.get("user/userscount");
  }

  usercart(obj:any):Observable<any>{
    console.log(obj)
    return this.hc.post("user/addtocart",obj);
  }
  wishList(obj:any):Observable<any>{
    console.log(obj)
    return this.hc.post("user/wishlist",obj);
  }
  getwishlist(userid:any):Observable<any>{
    console.log("wishlist",userid)
    return this.hc.get("user/getWishlist/"+userid);

  }
  getProducts():Observable<any>{
    return this.hc.get("/admin/allproducts");
  }

  
  deleteWishProduct(obj:any):Observable<any>{
    return this.hc.post("/user/deletewishproduct",obj);

  }
  viewItem(pCategory:any):Observable<any>{
    //console.log("in US1 ",pCategory)

    return this.hc.post("/admin/viewitem",pCategory)
  }
  getItem(pCategory:any):Observable<any>{
    //console.log("in US ",pCategory)
    return this.hc.get("/admin/oneproduct/"+pCategory);
  }
  getProduct(pname:any):Observable<any>{
   // console.log("in US ",pname)
    return this.hc.get("/admin/getitem/"+pname);
  }
  
  getInitialCartSize(userid:any){
    return this.hc.get("/user/getsize/"+userid);
  }

  
  cartsize=0;
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartsize);

    getCartSubjectSize(): Observable<any> {
        return this.cartSubject.asObservable();
    }

    setCartSubjectSize(cartsize: any) {
        this.cartSubject.next(cartsize);
    }


  getCartSize(userid:any):Observable<any>{
    console.log("the us is ",userid);
    return this.hc.get("/user/getsize/"+userid);
  }
  

  getCartItems(userid:any):Observable<any>{
    //console.log("the username is ",username)
    return this.hc.get("/user/getcartitems/"+userid);
  }
  deleteCartProduct(obj4:any):Observable<any>{
    return this.hc.post("/user/deleteproduct",obj4);
  }
   
  placeOrder(obj:any):Observable<any>{
    return this.hc.post("/user/orders",obj);
  }
  
  getOrderItems(userid:any):Observable<any>{
    //console.log("the username is ",username)
    return this.hc.get("/user/getOrderitem/"+userid);
  }
  deleteOrderProduct(obj5:any):Observable<any>{
    return this.hc.post("/user/deleteOrder",obj5);
  }

  deleteOrder1(obj:any):Observable<any>{
    console.log("service delete is",obj)
    return this.hc.post("/user/deleteOrder1",obj);
    
  }
}
