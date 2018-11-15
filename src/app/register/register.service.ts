import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../users/user';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {    
  private registerUrl='http://localhost:58941/api/accounts/create';
  private usersUrl='http://localhost:58941/api/accounts/users';
  private userUrl='http://localhost:58941/api/accounts/user/{id}';

  constructor(private http: HttpClient) { }
  
 register(user:User): Observable<User>{
  const headers = new HttpHeaders({'Content-Type':'application/json'});
   return this.http.post<User>(this.registerUrl,user,{headers: headers})
   .pipe(
    tap(data => console.log(JSON.stringify(data)))
  );
 }

 getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data)))
    );
}



}
