import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TodoDataService } from 'src/app/service/data/todo-data.service';
import { Todo } from 'src/app/models/todo.model';
import { Subscription, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/data/user.service';
import { BasicAuthService } from 'src/app/login/basic-auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[];
  todosSub: Subscription;
  userSub: Subscription;
  message: string;
  users: User[];
  @ViewChild('form') form: NgForm;
  loggedUser:string;

  // priorities = [
  //   { value: 'LOW', name: 'Low' },
  //   { value: 'MEDIUM', name: 'Medium' },
  //   { value: 'HIGH', name: 'High' },
  // ];
  // types = [
  //   { value: 'SPORT', name: 'Sport' },
  //   { value: 'EDUCATION', name: 'Education' },
  //   { value: 'HOME', name: 'Home' },
  //   { value: 'PARTY', name: 'Party' },
  //   { value: 'OTHER', name: 'Other' },
  // ];

  statuses = [
    { value: 'JUST_CREATED', name: 'Just created' },
    { value: 'IN_PROGRESS', name: 'In progress' },
    { value: 'FINISHED', name: 'Finished' },
    { value: 'DELETED', name: 'Deleted' },
  ];

  constructor(
    private todoService: TodoDataService,
    private userService: UserService,
    private basicAuthService: BasicAuthService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.basicAuthService.getAuthenticatedUser();
    this.fetchAll();
    this.userSub = this.userService.fetchAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  fetchAll() {
    this.todosSub = this.todoService.fetchAll().subscribe((todos) => {
      this.todos = todos;
    });
  }

  fetchFilteredList(status: string, username: string) {
    if (!status && !username) return;

    this.todosSub = this.todoService.fetchAll().subscribe((todos) => {
      this.todos = todos.filter((el) => {

        if (status && username) {
          if (el.status.toString() === status && el.user.username === username) {
            return el;
          }
        } else {
          let brojac = 0;
          console.log("One empty")
          if (status && el.status.toString() === status) {
            brojac++;
          }

          if (username && el.user.username === username) {
            brojac++;
          }

          if (brojac > 0) {
            return el;
          }
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.todosSub) {
      this.todosSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onDeleteToDo(id: number) {
    this.todoService.deleteTodo(id).subscribe((response) => {
      console.log(response);
      this.message = `Delete of ToDo with id:${id}  was successful!`;
      this.fetchAll();
    });
  }

  addTodo() {
    // this.router.navigate(['/','processes',this.processId,'todos', -1]);
  }

  onFilter() {
    console.log(this.form);
    this.fetchFilteredList(this.form.value.status, this.form.value.user);
  }

  onResetFilters() {
    this.form.reset();
    this.fetchAll();
  }
  isDeleteDisabled(todo:Todo):boolean{
    if(this.loggedUser===todo.user.username){
      return false;
    }

    if(todo.status.toString() ==='DELETED'){
      return false;
    }

    return true;
  }
}
