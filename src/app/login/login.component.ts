import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from './basic-auth.service';
import { UserService } from '../service/data/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string = 'Invalid credidentials!';
  invalidLogin = false;

  constructor(
    private router: Router,
    private basicAuthService: BasicAuthService,
    private userService:UserService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (
      this.basicAuthService.executeAuthenticationService(
        this.username,
        this.password
      )
    ) {
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
  handleBasicAuthLogin() {
    this.basicAuthService
      .executeAuthenticationService(this.username, this.password)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        (error) => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }

  handleJWTAuthLogin() {
    this.basicAuthService
      .executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        (data) => {
          // console.log("JWT WORKS")
          this.userService.getUser(this.username).subscribe(user =>{
            if(user.enabled){
              console.log("User logged in succesfully");
              console.log(data);
              this.router.navigate(['welcome']);
              this.invalidLogin = false;
            }else{
              this.basicAuthService.logout();
              console.log("User is not active!");
              this.errorMessage = "User account is not active!";
              this.invalidLogin = true;

            }
          })
        },
        (error) => {
          console.log(error);
          this.errorMessage = 'Invalid credidentials!';
          this.invalidLogin = true;
        }
      );
  }
}
