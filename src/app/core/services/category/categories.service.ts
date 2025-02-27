import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }


getAllCatgories():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
}

getSpecificCatogry(id:string ):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
}

getAllSubCatgories():Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories`)
}

}
