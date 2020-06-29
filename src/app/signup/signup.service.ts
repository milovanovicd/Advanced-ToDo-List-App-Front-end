import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JPA_API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  // isSignedUp:boolean = false;
  constructor(private http:HttpClient) { }

userSignUp(username:string,password:string){
    return this.http.post<boolean>(`${JPA_API_URL}/users/signup`,{username,password});
  }
}
