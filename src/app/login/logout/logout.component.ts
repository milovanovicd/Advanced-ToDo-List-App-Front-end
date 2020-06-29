import { Component, OnInit } from '@angular/core';
import { BasicAuthService } from '../../login/basic-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private basicAuthService:BasicAuthService) { }

  ngOnInit(): void {
    this.basicAuthService.logout();
  }

}
