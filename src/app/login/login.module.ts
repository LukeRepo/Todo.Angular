import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule.forChild([
          {path:'login',component:LoginComponent }

    ])
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
