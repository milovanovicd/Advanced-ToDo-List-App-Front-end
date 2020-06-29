import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo.model';
import {JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http:HttpClient) { }

  fetchAllTodos(processId:number){
    return this.http.get<Todo[]>(`${JPA_API_URL}/processes/${processId}/todos`);
  }

  fetchAll(){
    return this.http.get<Todo[]>(`${JPA_API_URL}/todos`);
  }

  deleteTodo(id: number) {
    return this.http.delete<Todo>(`${JPA_API_URL}/processes/todos/delete/${id}`);
  }

  getTodo(id: number) {
    return this.http.get<Todo>(`${JPA_API_URL}/processes/todos/${id}`,{});
  }

  updateTodo(todo:Todo) {
  return this.http.post<Todo>(`${JPA_API_URL}/processes/todos/update/`,todo);
  }

  createTodo(username: string, processId:number,description:string,targetDate:Date,priority:number,type:number) {
  return this.http.post<Todo>(`${JPA_API_URL}/processes/todos`,{username,processId,description,targetDate,priority,type});
  }
}
