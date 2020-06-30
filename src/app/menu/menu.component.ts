import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasicAuthService } from '../login/basic-auth.service';
import { UserService } from '../service/data/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  loggedUser: User;
  isLoading = false;
  userSub:Subscription;

  constructor(
    public basicAuthService: BasicAuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if(this.basicAuthService.getAuthenticatedUser()){
      this.userSub = this.userService.getUser(this.basicAuthService.getAuthenticatedUser())
      .subscribe((user) => {
        this.loggedUser = user;
        this.isLoading = false;
      },error =>{
        console.log("Error no user found!");
      });

    }

  }

  ngOnDestroy() {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
