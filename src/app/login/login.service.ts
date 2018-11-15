import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../users/user';


@Injectable({
  providedIn: 'root',
})
export class LoginService {    
  private loginUrl='http://localhost:50397/api/login';

  constructor(private http: HttpClient) { }
  
 login(user:User): Observable<User>{
   var loginHeaders= new HttpHeaders({'Content-Type':'application/json'});
   return this.http.post<User>(this.loginUrl,user,{headers:loginHeaders});
 }


}
