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
import { stringify } from 'querystring';

 

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
  //dataScadenza = Date;
  dataOggi = new Date().toJSON(stringify);

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
  

  completeTask(task: Task, id: number) {
    // this.taskService.update(id).pipe(first()).subscribe(data => {
    //                 this.alertService.success('Task completed!', true);                  
    //                 this.taskForm.patchValue({fatto: true})
    //             },
    //             error => {
    //                 this.alertService.error(error);
    task.fatto= true;
    this.taskService.update(id).pipe(first()).subscribe(() => { 
      this.loadAllTasks() 

  });      
    // task.fatto= true;
    // this.fatto = true;
    
  }    


  showCompleteTask(task: Task) {    
    if (task.fatto) {
      this.showComplete = !this.showComplete;
      return true;
    }
    
    // this.taskService.getById(this.taskForm.value)
    //       .pipe(first())
    //       .subscribe(
    //           data => {
    //               this.alertService.success('Task completed!', true);                  
    //               this.taskForm.patchValue({fatto: true})
    //           },
    //           error => {
    //               this.alertService.error(error);
                  
    //           });  
    // console.log('Saved: ' + JSON.stringify(this.taskForm.value) );
  }
  
  
}
