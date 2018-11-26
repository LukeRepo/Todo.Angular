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
  fatto = false;
  scaduto = false;
  dataScadenza = new Date();
  // timeLine: string;
  // todos: string[] = ['Inserito', 'Fatto', 'Scaduto'];

  
  constructor(private fb: FormBuilder, 
              private taskService:TaskService,
              private alertService: AlertService,
              private router: Router) {
      
    
  }

  

  ngOnInit(): void {
    this.taskForm = this.fb.group({
        nomeTask: ['', [Validators.required, Validators.minLength(3)]],           
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
    dataScadenza: '2030-10-10',
    fatto: false
  });
 
}

save() {
  this.submitted = true;  
// stop here if form is invalid
      if (this.taskForm.invalid) {        
         return;
      }
      this.loading = true;
      this.inserito=true;
        //this.fatto=false;
        //this.scaduto=false;
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




    console.log('Saved: ' + JSON.stringify(this.taskForm.value) + ' Inserito: ' + this.inserito.valueOf() + ' Fatto: ' +  this.fatto.valueOf() + ' Scaduto: '+ this.scaduto.valueOf());
}
}
  
