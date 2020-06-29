import { Component, OnInit } from '@angular/core';
import { Process } from '../../models/process.model';
import { Router } from '@angular/router';
import { ProcessService } from '../../service/data/process.service';
import { BasicAuthService } from '../../login/basic-auth.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {

  processes:Process[]=[];
  message:string;
  username:string;

  constructor(private router:Router,private processService:ProcessService,private basicAuthService:BasicAuthService) { }

  ngOnInit(): void {
    this.username = this.basicAuthService.getAuthenticatedUser();
    this.fetchAllProcesses();
  }

  onDeleteProcess(id:number){

      this.processService.deleteProcess(id).subscribe(response =>{
        console.log(response);
        this.message = `Delete of ToDo with id:${id}  was successful!`;
        this.fetchAllProcesses();
      });

  }
  fetchAllProcesses() {
    this.processService.fetchAllProcesses(this.username).subscribe((processes)=>{
      this.processes = processes;
      console.log(processes);
    })
  }

  onUpdateProcess(id:number){
    this.router.navigate(['processes',id]);
  }

  addProcess(){
    this.router.navigate(['processes',-1]);
  }

  onSeeTodos(id:number){
    // console.log(id);
    this.router.navigate(['processes',id,'todos']);
  }


}
