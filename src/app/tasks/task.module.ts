import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task.component';
import { MaterialModule } from '../material.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    
    RouterModule.forChild([
          {path:'task',component:TaskComponent }

    ])
  ],
  declarations: [
    TaskComponent,
  ]
})
export class TaskModule { }
