import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class TaskService {    

  constructor(private http: HttpClient) { }

  
  addTask(task: Task) {
    return this.http.post(`${environment.apiUrl}/tasks/create`, task);
  }
  
  getAll() {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/tasks/` + id);
  }


  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/tasks/` + id);
  } 

  update(id: number) {
    return this.http.put(`${environment.apiUrl}/tasks/` + id, JSON.stringify(Task));
  }

  // inserisciFatto(task: Task) {
  //   return this.http.post(`${environment.apiUrl}/tasks/` , task);
  // }

  // updateTask(update) {
  //   return this.http.put(`${environment.apiUrl}/tasks/` , update);    
  // }

    //Updates a Task
//  updateTask(update) {
//   return this.http
//   .put(this.base_url + this.tasks_endpoint, update)
//   .map(res => res.json());
  // } //updateTask
  

}
