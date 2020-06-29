import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../models/todo.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthService } from '../login/basic-auth.service';
import { User } from '../models/user.model';
import { UserService } from '../service/data/user.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todaysDate: Date = new Date();
  todo: Todo;
  todoSub: Subscription;
  username: string;
  processId: number;
  isUpdate = false;
  user: User;
  priorities = [
    { value: 0, name: 'Low' },
    { value: 1, name: 'Medium' },
    { value: 2, name: 'High' },
  ];
  types = [
    { value: 0, name: 'Sport' },
    { value: 1, name: 'Education' },
    { value: 2, name: 'Home' },
    { value: 3, name: 'Party' },
    { value: 4, name: 'Other' },
  ];

  statuses = [
    { value: 0, name: 'Just created' },
    { value: 1, name: 'In progress' },
    { value: 2, name: 'Finished' },
  ];

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private basicAuthService: BasicAuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.username = this.basicAuthService.getAuthenticatedUser();
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/', 'processes']);
      }
      let id = +paramMap.get('id');
      this.processId = +paramMap.get('processId');
      this.userService.getUser(this.username).subscribe((user) => {
        this.user = user;

        if (id === -1) {
          this.isUpdate = false;
          this.todo = new Todo(
            id,
            this.processId,
            this.user,
            '',
            0,
            0,
            0,
            null
          );
        } else {
          this.isUpdate = true;
          this.todoSub = this.todoService.getTodo(id).subscribe((todo) => {
            this.todo = todo;

            //Enum priority
            switch (this.todo.priority.toString()) {
              case 'LOW':
                this.todo.priority = 0;
                break;
              case 'MEDIUM':
                this.todo.priority = 1;
                break;
              case 'HIGH':
                this.todo.priority = 2;
                break;
            }

            //Enum type
            switch (this.todo.type.toString()) {
              case 'SPORT':
                this.todo.type = 0;
                break;
              case 'EDUCATION':
                this.todo.type = 1;
                break;
              case 'HOME':
                this.todo.type = 2;
                break;
              case 'PARTY':
                this.todo.type = 3;
                break;
              case 'OTHER':
                this.todo.type = 4;
                break;
            }

            //Enum status
            switch (this.todo.status.toString()) {
              case 'JUST_CREATED':
                this.todo.status = 0;
                break;
              case 'IN_PROGRESS':
                this.todo.status = 1;
                break;
              case 'FINISHED':
                this.todo.status = 2;
                break;
              case 'DELETED':
                this.todo.status = 3;
                break;
            }
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.todoSub) {
      this.todoSub.unsubscribe();
    }
  }

  onSaveTodo() {
    if (this.todo.id == -1) {
      console.log(this.todo.targetDate);
      this.todoService
        .createTodo(
          this.username,
          this.todo.processId,
          this.todo.description,
          this.todo.targetDate,
          this.todo.priority,
          this.todo.type
        )
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/', 'processes', this.processId, 'todos']);
        });
    } else {
      this.todoService.updateTodo(this.todo).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/', 'processes', this.processId, 'todos']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/', 'processes', this.processId, 'todos']);
  }
}
