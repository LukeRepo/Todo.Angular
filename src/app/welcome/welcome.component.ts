import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import { first } from 'rxjs/operators';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../_directives/alert.service';
import { Router } from '@angular/router';
import { isDate } from 'util';

 

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  currentUser: User;  
  users: User[] = [];
  tasks: Task[] = []; 
  checked: false; 
  currentTask: Task;
  taskForm: FormGroup;
  showComplete = false;
  fatto = false;  
  inserito = false;
  scaduto = false;

  constructor(private userService: UserService,
              private taskService: TaskService,
              private alertService: AlertService,
              private router: Router
    ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentTask = JSON.parse(localStorage.getItem('currentTask'));
    
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
    this.taskService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllTasks() 
    });    
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => { 
        this.users = users; 
    });
  }

  private loadAllTasks() {
    this.taskService.getAll().pipe(first()).subscribe(tasks => { 
        this.tasks = tasks; 
    });
  }

  showCompleteTask(task: Task, id: number) {    
    if (task.id === id) {
      this.showComplete = !this.showComplete;
      task.inserito = true;
    }
    
    this.taskService.getById(this.taskForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Copleteted a new task!', true);                  
                  this.taskForm.patchValue({fatto: true})
              },
              error => {
                  this.alertService.error(error);
                  
              });  
    console.log('Saved: ' + JSON.stringify(this.taskForm.value) );
  }
  

  CompleteTask(task: Task, id: number) {
    if (id === task.id) {
      this.showComplete = !this.showComplete;
    }      
    task.fatto= true;
    
  }    
  
  validazioneData(task: Task) {        
        
     if (task.dataScadenza) {
      return this.scaduto= true, task.scaduto = true;
     }
    
  }

}
