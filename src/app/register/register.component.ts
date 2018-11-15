import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { UserService } from '../users/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../_directives/alert.service';


function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({  
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  pageTitle = 'Register';  
  registerForm: FormGroup;
  errorMessage:string;  
  private result : string;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, 
              //private registerService:RegisterService,              
              private userService: UserService,
              private alertService: AlertService,
              private router: Router) {
       
  }

  
    
  
   ngOnInit() {
    // this.registerService.getUsers().subscribe(
    //   user => { 
    //     this.user = user;
        
        this.registerForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        cognome: ['', [Validators.required, Validators.maxLength(50)]],      
        emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
        }, { validator: emailMatcher }),
        password: ['', [Validators.required, Validators.minLength(6)]]
       });

       this.registerForm.get('emailGroup.email').valueChanges.pipe(
        debounceTime(1000)
        ).subscribe(value => console.log(value));
      }
      
      // convenience getter for easy access to form fields
    //get f() { return this.registerForm.controls; }

  populateTestData(): void {
    this.registerForm.patchValue({
      nome: 'Jack',
      cognome: 'Harkness',     
      emailGroup: { email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com' },
      password: 'Password!'     
     }); 
  }

  register() {
    this.submitted = true;

    // stop here if form is invalid
          if (this.registerForm.invalid) {
             return;
          }
          this.loading = true;
          this.userService.register(this.registerForm.value)
              .pipe(first())
              .subscribe(
                  data => {
                      this.alertService.success('Registration successful', true);
                      this.router.navigate(['/login']);
                  },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });
      
    console.log('Saved: ' + JSON.stringify(this.registerForm.value));
    this.userService.register(this.registerForm.value)
    .subscribe(
      () =>{console.log('Saved: ' + JSON.stringify(this.registerForm.value));
      this.result='Studente iscritto!'; }
      ,
      (error: any) => this.result ="Errore utente non aggiunto a DB"
    );      
    alert('UTENTE REGISTRATO!')

    
     }   

}

  
