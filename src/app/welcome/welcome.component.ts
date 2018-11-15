import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import { first } from 'rxjs/operators';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  currentUser: User;  
  users: User[] = [];
  tasks: Task[] = [];  

  constructor(private userService: UserService,
              private taskServie: TaskService,
    ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    
  }

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllTasks();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllUsers() 
    });    
  }

  deleteTask(id: number) {
    this.taskServie.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllTasks() 
    });    
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => { 
        this.users = users; 
    });
  }

  private loadAllTasks() {
    this.taskServie.getAll().pipe(first()).subscribe(tasks => { 
        this.tasks = tasks; 
    });
  }

}
