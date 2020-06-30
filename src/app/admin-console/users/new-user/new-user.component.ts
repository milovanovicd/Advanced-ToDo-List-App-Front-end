import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/data/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user:User;
  @ViewChild('form') form: NgForm;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.user = new User('','','',false,false);
  }

  onAddNewUser(){
    let isAdmin = false;
    if(this.form.value.role === "1") isAdmin=true;
    this.user.admin = isAdmin;
    this.userService.registerUser(this.user).subscribe((response)=>{
      if(response){
        this.form.reset();
        this.router.navigate(['/','admin-console','users']);
        console.log(this.form);
        console.log("User added: "+response);
      }else{
        window.confirm("Username od email is taken! Try new one!");
        console.log("User added: "+response);
      }

    },error=>{
      window.confirm("Username od email is taken! Try new one!");
    });


  }

  onCancel(){
    this.router.navigate(['/','admin-console','users']);
  }

}
