import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
   status:boolean=false;
   formRef: FormGroup=new FormGroup({});
  submitted: boolean=false;
  constructor( private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.formRef=new FormGroup({
    
      username:new FormControl(null,Validators.required),
     
      pwd:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')]),
      pwd1:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')]),

    })
  }
  getControls(){
    return this.formRef.controls;
  }
  back(){
    this.router.navigateByUrl("/login")
  }
  onSubmit(formRef:any){
    this.submitted=true;
  if(this.formRef.valid)
  {
    let obj=formRef.value;
    if(obj.password1==obj.password2){
      console.log("password same")
           this.us.changePassword(obj).subscribe(
             res=>{
               if(res["message"]=="nouser"){
                 
                 alert("username is invalid")
               }
              if(res["message"]=="success"){
                 this.router.navigateByUrl("/login")
                 
               }
             },
             err=>{
               alert("something went wrong in reset password");
               console.log(err)
             }
           )
    }
    else{
      this.status=true;
    }
  }
  }
}
