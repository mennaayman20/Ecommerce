import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  constructor(private httpClient:HttpClient) { }

  forgetPassword(data:any):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
  }
   
  confirmCode(data:any):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
  }
  
  resetPassword(data:any):Observable<any>{
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
  }
   
}
