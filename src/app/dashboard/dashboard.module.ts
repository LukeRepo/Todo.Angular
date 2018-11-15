import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";


@NgModule({
    imports: [
      CommonModule,      
      MaterialModule,      
      RouterModule.forChild([
            {path:'dashboard',component:DashboardComponent }
  
      ])
    ],
    declarations: [
        DashboardComponent,
    ]
  })
  export class DashboardModule { }