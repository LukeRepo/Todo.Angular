import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BachecaComponent } from './bacheca.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule.forChild([
          {path:'bacheca',component:BachecaComponent }

    ])
  ],
  declarations: [
    BachecaComponent,
  ]
})
export class BachecaModule { }
