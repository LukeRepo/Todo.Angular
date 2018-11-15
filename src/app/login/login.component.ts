import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from '../users/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_directives/alert.service';


@Component({
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Login';  
  loginForm: FormGroup;    
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(private fb: FormBuilder,               
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
      
  }

  // login() {
  //   this.formGroups = [];
  //   for (let i = 0; i < this.user.length; i++) {
  //     this.formGroups[i]= this.fb.group({
  //       user: this.user[i].nome,
  //       email: ['', [Validators.required, Validators.email]],        
  //       password: ['', [Validators.required]]  
  //     });
      
  //   }
  //   error => console.log(error)
  // }

  ngOnInit(): void {
    this.loginForm = this.fb.group({        
      nome: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

     // reset login status
     this.authenticationService.logout();

     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
 
// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.login(this.f.nome.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}

  populateTestData(): void {
    this.loginForm.patchValue({
      nome: 'Jack',         
      password: 'Password!',
      
    });
  
  }
  
}
