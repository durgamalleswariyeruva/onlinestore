import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
data:any;
userObj:any;
registerForm: FormGroup=new FormGroup({});
  submitted: boolean=false;
  length:any;
  userid:any;
  status:boolean=false;
constructor(private rt:Router, private us:UserService,private ts:ToastrService) { }

  ngOnInit(): void {
   
    this.registerForm=new FormGroup({
      userid:new FormControl("OSIN2021"+(Math.floor(Math.random() * 501)),Validators.required),
      username:new FormControl(null,Validators.required),
      fname:new FormControl(null,Validators.required),
      lname:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')]),
  
    })
  }
  
  users(){
    this.us.userscount().subscribe(
      res=>{
        this.length=res.message
      }
      ,
      err=>{
        this.ts.warning("Something went wrong in user length");
        console.log(err);
      }  
    
    )
  }
onLogin(){
this.rt.navigateByUrl("/login")
}
getControls(){
  return this.registerForm.controls;
}
onSubmit(){
  this.submitted=true;
  if(this.registerForm.valid)
  {
    this.userObj=this.registerForm.value

    this.us.createUser(this.userObj).subscribe(
      res=>{
        if(res["message"] =="user existed"){
          this.ts.warning("Username is already existed..choose another");
        }
        else{
          this.userid=res["userId"]
          this.status=true;
          this.ts.success(this.userid,"Registration succesfull!....Your userId for login into portal is :") 
           
          //navigate to login component
          this.rt.navigateByUrl("/login");
        }
      },
      err=>{
        this.ts.warning("Something went wrong in user creation");
        console.log(err);
      }  
    )
    
  }
}
}
