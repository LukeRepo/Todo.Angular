import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { TaskService } from './task.service';
import { Task } from './task';
import { Router } from '@angular/router';
import { AlertService } from '../_directives/alert.service';



@Component({
  //selector: 'radio-ng-model-todo',
  //selector: 'todo-radio-group',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  pageTitle = 'Task';  
  taskForm: FormGroup;
  errorMessage:string;
  loading = false;
  submitted = false;
  inserito = false;
  // timeLine: string;
  // todos: string[] = ['Inserito', 'Fatto', 'Scaduto'];

  
  constructor(private fb: FormBuilder, 
              private taskService:TaskService,
              private alertService: AlertService,
              private router: Router) {
      
    
  }

  // Task() {
  //   this.formGroups = [];
  //   for (let i = 0; i < this.task.length; i++) {
  //     this.formGroups[i]= this.fb.group({
  //       task: this.task[i].nomeTask,
  //       nomeTask: ['', [Validators.required]],                
  //       todo: ['', [Validators.required]]  
  //     });
      
  //   }
    
  // }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
        nomeTask: ['', [Validators.required, Validators.minLength(3)]],
        //todo: ['', [Validators.required]],     
        descrizione: ['', [Validators.required]],
        dataScadenza: ['', [Validators.required]],
    });
} 
  
populateTestData(): void {
  this.taskForm.patchValue({
    nomeTask: 'Jack e la pianta di fagioli',
    Todo: 'Inserito', 
    inserito: true,   
    descrizione: 'Arrampicarsi sulla pianta di fagioli',
    dataScadenza: '2030-10-10'
  });
 
}

save() {
  this.submitted = true;
  this.inserito=true;
// stop here if form is invalid
      if (this.taskForm.invalid) {
         return;
      }
      this.loading = true;
      this.taskService.addTask(this.taskForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('New task added', true);
                  this.router.navigate(['/welcome']);
                  //this.taskForm.patchValue({inserito: true})
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });  




    console.log('Saved: ' + JSON.stringify(this.taskForm.value) + this.inserito.valueOf());
}
}
  
