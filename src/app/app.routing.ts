import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./login/auth.guard";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { BachecaComponent } from "./bacheche/bacheca.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


const appRoutes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'bacheca', component: BachecaComponent },
    { path: 'dashboard', component: DashboardComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);