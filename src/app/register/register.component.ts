import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
constructor(private rt:Router, private us:UserService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
    
      username:new FormControl(null,Validators.required),
      fname:new FormControl(null,Validators.required),
      lname:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')]),
  
    })
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
    console.log(this.registerForm.value);

    this.us.createUser(this.userObj).subscribe(
      res=>{
        if(res["message"] =="user existed"){
          alert("Username is already existed..choose another");
        }
        else{
          alert("Registration succesfull");

          //navigate to login component
          this.rt.navigateByUrl("/login");
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }  
    )
    
  }
}
}
