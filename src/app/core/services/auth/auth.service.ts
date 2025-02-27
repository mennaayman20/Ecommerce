import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router=inject(Router)
  userData:any;
  constructor( private httpClient:HttpClient ) { }


  sendregisterForm(data:object) : Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data);
  }


  sendloginForm(data:object) : Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data);
  }



  getUserData():void{
  this.userData=  jwtDecode(localStorage.getItem('token') !)
  console.log(this.userData)
  }


  logOutUser():void{

    //عكس اللي موجود في ال login .ts

localStorage.removeItem('token')

this.userData=null;

this.router.navigate(['/login'])


  }




}
