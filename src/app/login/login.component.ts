import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status:any
  s1:any;
  data:any;
  userCredObj:any;
  username:any;
  registerForm: FormGroup=new FormGroup({});
    submitted: boolean=false;
  constructor(private rt:Router, private us:UserService) { }
  ngOnInit(): void {
    this.registerForm=new FormGroup({
    
      username:new FormControl(null,Validators.required),

      password:new FormControl(null,Validators.required),
  
    })
  }
  register()
  {
    this.rt.navigateByUrl("/register")
  }

  getControls(){
    return this.registerForm.controls;
  }
  forgot(){
    this.rt.navigateByUrl("/reset")
  }
  onSubmit(){
    this.submitted=true;
    this.rt.navigateByUrl("/home")

    if(this.registerForm.valid)
    {
      this.userCredObj=this.registerForm.value
      console.log("name is:",this.userCredObj)
      
      this.us.loginUser(this.userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
            //store token and username in local storage
            localStorage.setItem("token",res["signedToken"])
            localStorage.setItem("username",res["username"])
            //navigate to user component
            this.rt.navigateByUrl("/home")
            .then(() => {
              window.location.reload();
            });
            //window.location.reload ();


          }
          else if(res["message"]=="admin login"){
            
            //store token and username in local storage
            localStorage.setItem("token",res["signedToken"])
            localStorage.setItem("username",res["username"])
           // this.rt.navigateByUrl("/admindashboard")
            this.rt.navigateByUrl("/admindashboard")
            .then(() => {
              window.location.reload();
            });
            //navigate to user component
           // window.location.reload()


          }
          else{
            if(res["message"]=="Invalid username")
            {   status="success";
                this.s1="Invalid Username"
            }
            if(res["message"]=="Invalid password")
            {
              status="success";
              this.s1="Invalid Password"
            }

            this.rt.navigateByUrl("/login")
          }
        },
        err=>{
          status="fail"
          this.s1="Something went wrong in user login"
          console.log(err)
        }
      )

    }
  }
}
