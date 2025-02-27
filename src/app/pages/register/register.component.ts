import { routes } from './../../app.routes';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';

import {AbstractControl, FormControl, FormGroup ,ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)

  loading:boolean=false

  success:string=''

  msgError:string=''
  //create form syntax


  registerForm:FormGroup=new FormGroup({

    name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email:new FormControl(null , [ Validators.required,Validators.email]),
    password:new FormControl(null ,[Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword:new FormControl(null , [Validators.required] ),
    phone:new FormControl(null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)] ),

  }  , {validators:[this.errorRePassword]} )

  submitForm():void{

     if(this.registerForm.valid){
      this.loading=true
      this.authService.sendregisterForm(this.registerForm.value).subscribe({
  next:(res)=>{
    
    console.log(res)
if(res.message==='success'){

//navigate path

setTimeout(() => {
  this.router.navigate(['/login'])
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
     }  else{

      this.registerForm.markAllAsTouched();
     }


  }


//custom validation
errorRePassword(group:AbstractControl){

const password = group.get('password')?.value;

const rePassword= group.get('rePassword')?.value;


return password===rePassword ? null : {mismatch:true}

// if(password === rePassword){
//   return null;
// }
// else{
//   return{mismatch:true}
// }

}


}
