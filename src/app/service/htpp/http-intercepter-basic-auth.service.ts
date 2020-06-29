import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { BasicAuthService } from 'src/app/login/basic-auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  constructor(
    private basicAuthService:BasicAuthService
  ) {}

  //Acts like a filter
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    if(basicAuthHeaderString && username){
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString,
        }
      });
    }

    //Interseptujemo request i dodajemo Auth header i prosledjujemo sledecem HttpHandler-u
    return next.handle(request);
  }
}
