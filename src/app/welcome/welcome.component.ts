import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicAuthService } from '../login/basic-auth.service';
import { UserService } from '../service/data/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit,OnDestroy {
  username: string;
  welcomeMessage:string;
  loggedUser:User
  isLoading = false;
  userSub:Subscription;

  constructor(
    private basicAuthService:BasicAuthService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.username = this.basicAuthService.getAuthenticatedUser();
    this.userSub = this.userService.getUser(this.username).subscribe(user =>{
      this.loggedUser = user;
      this.isLoading = false;
    })
  }

  ngOnDestroy():void{
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
