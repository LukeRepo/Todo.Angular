import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Bacheca } from './bacheca';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class BachecaService {    
  private bachecaUrl='http://localhost:50397/api/Bacheche';
  private bachecaSingoloUrl='http://localhost:50397/api/Bacheche/5';
  private bachecaFormUrl='http://localhost:50397/api/Bacheche';  
  private bachecaCancellaUrl='http://localhost:50397/api/Bacheche/5';

  lastId = 0;
  bacheche: Bacheca[] = [];

  constructor() { }

    addTask(bacheca: Bacheca): BachecaService {
       if (!bacheca.id) {
          bacheca.id = ++this.lastId;
      }
      this.bacheche.push(bacheca);
      return this;

    }

    getTaskById(id: number):  Bacheca | any {
      return this.bacheche
        .filter(bacheca => bacheca.id === id)
        .pop();
    }

    getAllTodos(): Bacheca[] {
      return this.bacheche;
    }


  //constructor(private http: HttpClient) { }

  // getBacheche(): Observable<Bacheca[]> {
  //   return this.http.get<Bacheca[]>(this.bachecaUrl)
  //     .pipe(
  //       tap(data => console.log(JSON.stringify(data)))
  //     );
  // }

  // getBacheca(nomeBacheca:string):Observable<Bacheca>{
  //   return this.http.get<Bacheca>(this.bachecaSingoloUrl+'?nb='+nomeBacheca)
  //     .pipe(
  //       tap(data => console.log(JSON.stringify(data)))
  //     );

  // } 

  // inserisciBacheca(bacheca: Bacheca):Observable<Bacheca>{
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<Bacheca>(this.bachecaFormUrl, bacheca, { headers: headers })
  //   .pipe(
  //     tap(data => console.log(JSON.stringify(data)))
  //   );
  //  }

   
  //  cancella(bacheca): Observable<string> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });    


  //   return this.http.delete(this.bachecaCancellaUrl+"?nb="+bacheca, { headers:headers,responseType:'text'}).pipe(
  //     tap(data => console.log(JSON.stringify(data)))
  //   );
  //  }


}
