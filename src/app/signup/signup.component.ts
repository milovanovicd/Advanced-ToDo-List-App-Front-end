import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string;
  password: string;
  message: string = '';
  showMessage = false;

  constructor(private signUpService:SignupService) { }

  ngOnInit(): void {
  }

  async onSignUp(){
    const responseObject = await this.signUpService.userSignUp(this.username,this.password);
    responseObject.subscribe(result =>{
        if(result===true){
          this.message = 'You have signed up successfully!';
          this.showMessage = true
        }else{
          this.message = 'Username is taken! Try another one.';
          this.showMessage = true;
        }
    })
  }
}
