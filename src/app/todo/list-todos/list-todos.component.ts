import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoDataService } from '../../service/data/todo-data.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BasicAuthService } from '../../login/basic-auth.service';
import { Process } from 'src/app/models/process.model';
import { ProcessService } from 'src/app/service/data/process.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  processId: number;
  todoSub: Subscription;
  todos: Todo[] = [];
  message: string;
  username: string;
  process:Process;
  isLoading = false;

  statuses = [
    { value: 'JUST_CREATED', name: 'Just created' },
    { value: 'IN_PROGRESS', name: 'In progress' },
    { value: 'FINISHED', name: 'Finished' },
  ];

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    private basicAuthService: BasicAuthService,
    private route:ActivatedRoute,
    private processService:ProcessService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.username = this.basicAuthService.getAuthenticatedUser();
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('processId')) {
        this.router.navigate(['/processes']);
      }
      let processId = +paramMap.get('processId');
      this.processId = processId;
      this.processService.getProcess(processId).subscribe(process =>{
        this.process = process;
        this.fetchAllTodos();
        this.isLoading=false;
      })

    });

  }

  ngOnDestroy() {
    if (this.todoSub) {
      this.todoSub.unsubscribe();
    }
  }

  private fetchAllTodos() {
    this.todoSub = this.todoService
      .fetchAllTodos(this.processId)
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  onDeleteToDo(id: number) {
    this.todoService.deleteTodo(id).subscribe((response) => {
      console.log(response);
      this.message = `Delete of ToDo with id:${id}  was successful!`;
      this.fetchAllTodos();
    });
  }

  onUpdateToDo(id: number) {
    this.router.navigate(['/','processes',this.processId,'todos', id]);
  }

  addTodo() {
    this.router.navigate(['/','processes',this.processId,'todos', -1]);
  }

  fetchFilteredList(status:string) {
    if(!status) return;
    this.todoSub = this.todoService.fetchAllTodos(this.processId).subscribe(todos=>{
      this.todos=todos.filter(el=>{
        if(el.status.toString() === status) return el;
      });
    })
  }

  onFilter(){
    console.log(this.form);
    this.fetchFilteredList(this.form.value.status)
  }

  onResetFilters(){
    this.form.reset();
    this.fetchAllTodos();
  }
}
