import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
   status:boolean=false;
  constructor( private us:UserService, private router:Router) { }

  ngOnInit(): void {
  }
  back(){
    this.router.navigateByUrl("/login")
  }
  onSubmit(formRef:any){
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
