import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginModule } from './login/login.module';
import { BachecaModule } from './bacheche/bacheca.module';
import { TaskModule } from './tasks/task.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './login/auth.guard';
import { AuthenticationService } from './login/authentication.service';
import { UserService } from './users/user.service';
import { fakeBackendProvider } from './users/fakeBackendProvider';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './users/jwt.interceptor';
import { ErrorInterceptor } from './users/error.interceptor';
import { routing } from './app.routing';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_directives/alert.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import { MaterialModule } from './material.module';
import { TaskComponent } from './tasks/task.component';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AlertComponent,    
    RegisterComponent,
    LoginComponent,
    //TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    MatNativeDateModule,
    MaterialModule,
    routing,   
    //LoginModule, 
    //RegisterModule, 
    BachecaModule, 
    TaskModule,
    DashboardModule
    //RouterModule.forRoot([
      //{ path: 'login', component: WelcomeComponent },
      // { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
      // { path: '**', redirectTo: 'login', pathMatch: 'full' },
      // { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
      //{ path: 'welcome', component: WelcomeComponent },
    //]) 
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},

    // provider used to create fake backend
    fakeBackendProvider

  ],
  //entryComponents: [TaskComponent],  
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
