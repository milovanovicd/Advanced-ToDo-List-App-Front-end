import { Component, OnInit, OnDestroy } from '@angular/core';
import { Process } from '../models/process.model';
import { Subscription } from 'rxjs';
import { BasicAuthService } from '../login/basic-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from '../service/data/process.service';
import { User } from '../models/user.model';
import { UserService } from '../service/data/user.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  process: Process;
  processSub: Subscription;
  username: string;
  user:User;
  priorities = [
    { value: 0, name: 'Low' },
    { value: 1, name: 'Medium' },
    { value: 2, name: 'High' },
  ];
  constructor(
    private processService: ProcessService,
    private route: ActivatedRoute,
    private router: Router,
    private basicAuthService:BasicAuthService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.username = this.basicAuthService.getAuthenticatedUser();
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('processId')) {
        this.router.navigate(['/processes']);
      }
      let processId = +paramMap.get('processId');
      if (processId === -1) {
        this.userService.getUser(this.username).subscribe(user =>{
          this.user = user;
          this.process = new Process(processId,"",1,this.user,[]);
        })
      } else {
        this.processSub = this.processService
          .getProcess(processId)
          .subscribe((process) => {
            this.process = process;
                      //Enum priority
          switch (this.process.priority.toString()) {
            case 'LOW':
              this.process.priority = 0;
              break;
            case 'MEDIUM':
              this.process.priority = 1;
              break;
            case 'HIGH':
              this.process.priority = 2;
              break;
          }
          });
      }
    });
  }

  ngOnDestroy(){
    if(this.processSub){
      this.processSub.unsubscribe();
    }
  }

  onSaveProcess(){
    if (this.process.processId == -1) {
      console.log(this.process);
      this.processService.createProcess(this.username,this.process.name,this.process.priority).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/processes']);
      });
    } else {
      this.processService
        .updateProcess(this.process)
        .subscribe((response) => {
          console.log(response);
          // this.message = "Updated successfuly!"
          this.router.navigate(['/processes']);
        });
    }
  }
}
