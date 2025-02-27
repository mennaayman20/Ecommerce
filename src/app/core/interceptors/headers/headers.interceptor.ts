import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  
  //logic REQ --->send headers
 //clone نسخه من الريكويست

 if(localStorage.getItem('token')){

//

    req=req.clone({
    //options (configuration)
    setHeaders:{
      token:localStorage.getItem('token')!

    }
  })

 }








  return next(req); //logic RES



};
