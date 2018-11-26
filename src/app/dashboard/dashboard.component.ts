import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../users/user";
import { Task } from "../tasks/task";
import { UserService } from "../users/user.service";
import { TaskService } from "../tasks/task.service";
import { first } from "rxjs/operators";
import { MatPaginator } from "@angular/material";
import * as Chartist from 'chartist';
import { stringify } from "querystring";


@Component({  
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    currentUser: User;  
  users: User[] = [];
  tasks: Task[] = [];
  dataOggi = new Date();
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private userService: UserService,
              private taskServie: TaskService,) { 
                                                  
this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
}


startAnimationForLineChart(chart){
  let seq: any, delays: any, durations: any;
  seq = 0;
  delays = 80;
  durations = 500;

  chart.on('draw', function(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    } else if(data.type === 'point') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
  });

  seq = 0;
};
startAnimationForBarChart(chart){
  let seq2: any, delays2: any, durations2: any;

  seq2 = 0;
  delays2 = 80;
  durations2 = 500;
  chart.on('draw', function(data) {
    if(data.type === 'bar'){
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
    }
  });

  seq2 = 0;
};


  displayedColumns = ['id','nome', 'cognome', 'email', 'delete'];
  dataSource = JSON.parse(localStorage.getItem('users'));
  dataSourceTask = JSON.parse(localStorage.getItem('tasks'));

ngOnInit() {
    this.loadAllUsers();
    this.loadAllTasks();
    this.dataSource.paginator = this.paginator;
    this.dataSourceTask.paginator = this.paginator;



  const dataCompletedTasksChart: any = {
    labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
    ]
};

const optionsCompletedTasksChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
}

var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

// start animation for the Completed Tasks Chart - Line Chart
this.startAnimationForLineChart(completedTasksChart);

}

private loadAllUsers() {
  this.userService.getAll().pipe(first()).subscribe(users => { 
      this.users = users; 
  });
}

private loadAllTasks() {
  this.taskServie.getAll().pipe(first()).subscribe(tasks => { 
      this.tasks = tasks; 
  });
}

deleteUser(id: number) {
  this.userService.delete(id).pipe(first()).subscribe(() => { 
      this.loadAllUsers() 
  });    
}

deleteTask(id: number) {
  this.taskServie.delete(id).pipe(first()).subscribe(() => { 
      this.loadAllTasks() 
  });    
}

// showTaskScadute(task: Task) {
//   if (task.dataScadenza > this.dataOggi) {
//     for (let index = 0; index < Task.length; index++) {
//       const scaduto = Task[index];
      
//     }
//   }
// }

}
