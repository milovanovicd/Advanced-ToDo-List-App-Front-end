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
    this.user = new User('','','',false);
  }

  onAddNewUser(){
    let isAdmin = false;
    if(this.form.value.role === "1") isAdmin=true;
    this.user.admin = isAdmin;
    this.userService.addUser(this.user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/','admin-console','users']);
    });
    console.log(this.form);

  }

  onCancel(){
    this.router.navigate(['/','admin-console','users']);
  }

}
