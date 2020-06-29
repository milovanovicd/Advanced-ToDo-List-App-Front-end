import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Process } from 'src/app/models/process.model';
import { ProcessService } from 'src/app/service/data/process.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/data/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css'],
})
export class ProcessesComponent implements OnInit, OnDestroy {
  processes: Process[];
  processSub: Subscription;
  message: string;
  users: User[];
  userSub:Subscription;
  @ViewChild('form') form: NgForm;

  constructor(
    private processService: ProcessService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchAllProcesses();
    this.userSub=this.userService.fetchAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  fetchAllProcesses() {
    this.processService.fetchAll().subscribe((processes) => {
      this.processes = processes;
      console.log(processes);
    });
  }

  onUpdateProcess(id: number) {
    this.router.navigate(['processes', id]);
  }
  onSeeTodos(id: number) {
    this.router.navigate(['processes', id, 'todos']);
  }

  onDeleteProcess(id: number) {
    this.processService.deleteProcess(id).subscribe((response) => {
      console.log(response);
      this.message = `Delete of process with id:${id}  was successful!`;
      this.fetchAllProcesses();
    });
  }

  fetchFilteredList(username:string) {
    if(!username) return;
    this.processSub = this.processService.fetchAll().subscribe(processes=>{
      this.processes=processes.filter(el=>{
        if(el.user.username === username) return el;
      });
    })
  }

  onFilter() {
    console.log(this.form);
    this.fetchFilteredList(this.form.value.user);
  }

  onResetFilters() {
    this.form.reset();
    this.fetchAllProcesses();
  }

  ngOnDestroy() {
    if (this.processSub) {
      this.processSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
