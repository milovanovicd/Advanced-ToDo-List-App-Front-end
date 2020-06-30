import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}


  fetchAllUsers(){
    return this.http.get<User[]>(`${JPA_API_URL}/users`);
  }

  getUser(username: string) {
    return this.http.get<User>(`${JPA_API_URL}/users/${username}`);
  }

  updateUser(user:User) {
    return this.http.post<User>(`${JPA_API_URL}/users/update`,user);
  }

  addUser(user:User){
    return this.http.post<boolean>(`${JPA_API_URL}/users/signup`,user);
  }

  deleteUser(username:string){
    return this.http.delete<boolean>(`${JPA_API_URL}/users/${username}`);
  }

  registerUser(user:User){
    return this.http.post<boolean>(`${JPA_API_URL}/users/register`,user);
  }
}
