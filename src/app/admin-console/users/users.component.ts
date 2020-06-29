import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/data/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BasicAuthService } from 'src/app/login/basic-auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {
  users:User[];
  message:string;
  userSub:Subscription;
  activeUser:string;

  constructor(private userService:UserService,private router:Router, private basicAuthService:BasicAuthService) { }

  ngOnInit(): void {
    this.activeUser = this.basicAuthService.getAuthenticatedUser();
    this.fetchAll();
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

  fetchAll() {
    this.userSub = this.userService.fetchAllUsers().subscribe(users=>{
      this.users=users;
    })
  }

  addNewUser(){
    this.router.navigate(['/','new-user']);
  }

  onDeleteUser(username:string){
    this.userService.deleteUser(username).subscribe(()=>{
      this.fetchAll();
    },error =>{
      console.log(error);
    })
  }
}
