import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { UserService } from '../service/data/user.service';

export const AUTHENTICATED_USER = 'authenticatedUser';
export const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthService {
  constructor(private router: Router, private http: HttpClient) {}

  executeJWTAuthenticationService(username: string, password: string) {

    return this.http.post<any>(`${API_URL}/authenticate`,{username,password})
    .pipe(map(data =>{
      //ako imamo validan odgovor odradi ovo i vrati odgovor
      sessionStorage.setItem(AUTHENTICATED_USER, username);
      sessionStorage.setItem(TOKEN, `Bearer ${data.token}`); //Vraca nam token <-
      return data;
    }));
  }

  executeAuthenticationService(username: string, password: string) {
    //Kreiranje Header Stringa
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);
    //Kreiranje Http Header-a
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,{headers})
    .pipe(map(data =>{
      //ako imamo validan odgovor odradi ovo i vrati odgovor
      sessionStorage.setItem(AUTHENTICATED_USER, username);
      sessionStorage.setItem(TOKEN, basicAuthHeaderString);
      return data;
    }));
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);

  }
  getAuthenticatedToken() {
    if(this.getAuthenticatedUser)
    return sessionStorage.getItem(TOKEN);

  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

//Deklaracija klase
export class AuthenticationBean {
  constructor(public message: string) {}
}
