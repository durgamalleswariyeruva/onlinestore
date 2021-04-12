import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor( private us:UserService, private router:Router,private ts:ToastrService) { }

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
           this.us.changePassword(obj).subscribe(
             res=>{
               if(res["message"]=="nouser"){
                 
                 this.ts.warning("username is invalid")
               }
              if(res["message"]=="success"){
                this.ts.success("Registration is successfull")

                 this.router.navigateByUrl("/login")
                 
               }
             },
             err=>{
               this.ts.warning("something went wrong in reset password");
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
