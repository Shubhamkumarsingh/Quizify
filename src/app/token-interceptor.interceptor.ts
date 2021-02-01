import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreTokenService } from './store-token.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private storeToken : StoreTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.storeToken.isLoggedIn())
    {
      
    const req = request.clone({
      headers: request.headers.set('Authorization','Bearer ${this.storeToken.getToken()}')
    });
    return next.handle(req);
    }

    return next.handle(request);
  }
}
