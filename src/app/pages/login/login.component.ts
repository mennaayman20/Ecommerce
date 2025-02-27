import { routes } from './../../app.routes';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';

import {AbstractControl, FormControl, FormGroup ,ReactiveFormsModule, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 private readonly authService=inject(AuthService)
  private readonly router=inject(Router)

  loading:boolean=false

  success:string=''

  msgError:string=''
  //create form syntax


loginForm:FormGroup=new FormGroup({

    
    email:new FormControl(null , [ Validators.required,Validators.email]),
    password:new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
    
  })

  submitForm():void{

     if(this.loginForm.valid){
      this.loading=true
      this.authService.sendloginForm(this.loginForm.value).subscribe({
  next:(res)=>{
    
    console.log(res)
if(res.message==='success'){

  



setTimeout(() => {
  //save token
localStorage.setItem('token' , res.token);

// 
this.authService.getUserData()

//navigate to home

  this.router.navigate(['/home'])
}, 3000);

this.success=res.message

}
this.loading=false
  },
  error:(err : HttpErrorResponse)=>{

  this.msgError =  err.error.message

console.log(err)
this.loading=false
  }
})
     }

  }



}
