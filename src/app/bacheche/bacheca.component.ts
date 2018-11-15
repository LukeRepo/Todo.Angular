import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { User } from '../users/user';
import { BachecaService } from './bacheca.service';
import { AlertService } from '../_directives/alert.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TaskService } from '../tasks/task.service';


@Component({
  
  templateUrl: './bacheca.component.html',
  styleUrls: ['./bacheca.component.css']
})

export class BachecaComponent implements OnInit {
  pageTitle = 'Bacheca';  
  taskForm: FormGroup;
  errorMessage:string;
  loading = false;
  submitted = false;
  
  constructor(private fb: FormBuilder, 
              private bachecaService:BachecaService,
              private taskService: TaskService,
              private alertService: AlertService,
              private router: Router) {
      
  }

  
  ngOnInit() {
    this.taskForm = this.fb.group({
      nomeTask: ['', [Validators.required]],
      inserito: ['', [Validators.required]],      
      fatto: ['', [Validators.required]],
      scaduto: ['', [Validators.required]],
      descrizione: ['', [Validators]],
      dataScadenza: ['', [Validators]],
     });

} 
  
populateTestData(): void {
  this.taskForm.patchValue({
    nome: 'Jack',
    cognome: 'Harkness',     
    emailGroup: { email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com' },
    password: 'Password!'
     
  });
 
}

    // save() {
    //   this.submitted = true;

    // // stop here if form is invalid
    //       if (this.taskForm.invalid) {
    //          return;
    //       }
    //       this.loading = true;
    //       this.taskService.addTask(this.taskForm.value)
    //           .pipe(first())
    //           .subscribe(
    //               data => {
    //                   this.alertService.success('New task added', true);
    //                   this.router.navigate(['/login']);
    //               },
    //               error => {
    //                   this.alertService.error(error);
    //                   this.loading = false;
    //               });  




    //     console.log('Saved: ' + JSON.stringify(this.taskForm.value));
    // }
}
  
