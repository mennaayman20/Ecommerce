import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { PasswordsService } from '../../core/services/passwords/passwords.service';

@Component({
  selector: 'app-forgetpass',
  imports: [ReactiveFormsModule ,NgIf ],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent {
  private readonly passwordService=inject(PasswordsService)

  step:number=1
  constructor(private reset:PasswordsService , private auth:AuthService, private router:Router){}

  sendmail:FormGroup=new FormGroup({
email:new FormControl(null,[Validators.required , Validators.email])

  })

  verifycode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required ,Validators.pattern(/^[A-Z]\w{7,}$/)])
    
      })

      resetPassword:FormGroup=new FormGroup({
        email:new FormControl(null,[Validators.required , Validators.email]),
        newPassword:new FormControl(null ,[Validators.required]),
          })
    

submitEmail(){
  this.reset.forgetPassword(this.sendmail.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.step=2

    },
    error:(err)=>{
      console.log(err)
    }
  })
}
submitCode(){
  this.reset.confirmCode(this.verifycode.value).subscribe({
    next:(res)=>{
      if(res.status=='Success'){
        this.step=3
      }
     
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

submitPassword(){

  this.reset.resetPassword(this.resetPassword.value).subscribe({
    next:(res)=>{
      console.log(res);
if(res.token){
 localStorage.setItem('token',res.token)
 this.auth.getUserData();
 this.router.navigate(['/home'])
}
     


    },
    error:(err)=>{
      console.log(err);
    }
  })
}

}
