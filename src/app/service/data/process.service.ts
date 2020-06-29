import { Injectable } from '@angular/core';
import { Process } from 'src/app/models/process.model';
import { HttpClient } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http:HttpClient) { }

  fetchAllProcesses(username:string){
    return this.http.get<Process[]>(`${JPA_API_URL}/${username}/processes`);
  }

  fetchAll(){
    return this.http.get<Process[]>(`${JPA_API_URL}/processes`);
  }

  deleteProcess(id: number) {
    return this.http.delete<Process>(`${JPA_API_URL}/processes/delete/${id}`);
  }

  getProcess(id: number) {
    return this.http.get<Process>(`${JPA_API_URL}/processes/${id}`);
  }

    updateProcess(process:Process) {
    return this.http.post<Process>(`${JPA_API_URL}/processes/update`,process);
  }

  createProcess(username: string, name:string, priority:number) {
    return this.http.post<Process>(`${JPA_API_URL}/processes/create`,{username,name,priority});
  }
}

