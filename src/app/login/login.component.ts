import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthService } from './basic-auth.service';

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
    private basicAuthService: BasicAuthService
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
          console.log(data);
          this.router.navigate(['welcome']);
          this.invalidLogin = false;
        },
        (error) => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }
}
