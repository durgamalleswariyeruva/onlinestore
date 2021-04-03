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
  
  usercart(obj:any):Observable<any>{
    console.log(obj)
    return this.hc.post("user/addtocart",obj);
  }
  getProducts():Observable<any>{
    return this.hc.get("/admin/allproducts");
  }

  getCartItems(username:any):Observable<any>{
    //console.log("the username is ",username)
    return this.hc.get("/user/getcartitems/"+username);
  }
  deleteCartProduct(obj:any):Observable<any>{
    return this.hc.post("/user/deleteproduct",obj);
  }
  viewItem(obj:any):Observable<any>{
    return this.hc.post("/admin/viewitem",obj)
  }
  getItem(pCategory:any):Observable<any>{
    console.log("in US ",pCategory)
    return this.hc.get("/admin/oneproduct/"+pCategory);
  }
  
  getInitialCartSize(username:any){
    return this.hc.get("/user/getsize/"+username);
  }

  
  cartsize=0;
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartsize);

    getCartSubjectSize(): Observable<any> {
        return this.cartSubject.asObservable();
    }

    setCartSubjectSize(cartsize: any) {
        this.cartSubject.next(cartsize);
    }


  getCartSize(username:any):Observable<any>{
    console.log("the us is ",username);
    return this.hc.get("/user/getsize/"+username);
  }
  
}
