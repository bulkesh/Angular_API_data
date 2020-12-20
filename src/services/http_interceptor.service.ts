import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { map , catchError } from 'rxjs/operators'; // RxJS v6+

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

/**
 * HttpInterceptor - This service intercept all the out going request 
 * and incomming response.
 * Here you can manipulate request and response.
 * You can add http headers, HSRF token etc.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const lcUrl = request.url.toLowerCase();

    /** here Global spinner(Loader) start displaying on screen */
    return next.handle(request).pipe(
      map((event: HttpEvent<{}>)=>{
        
        if(event instanceof HttpResponse){
          /** here Global spinner(Loader) can hide on success response. */
        }
        return event;
      }),
      catchError((error: HttpErrorResponse)=>{
         /** here Global spinner(Loader) can hide on error. */
        /** Http error response can be handled here */
        return throwError(error);

      }));
  }
}
