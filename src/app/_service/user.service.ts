import { Injectable } from '@angular/core';
import { Observable, tap, of, catchError, map } from 'rxjs';

import { User } from '../_model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserByEmail(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'}),
    };
    return this.http.post<any>(`http://localhost:3000/api/users/login`, user, httpOptions).pipe(
      tap(res => console.log(res)),
      catchError(err => this.handleError(err, undefined))
    );
  }

  addUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'}),
    };
    return this.http.post<User>(`http://localhost:3000/api/users`, user, httpOptions).pipe(
      tap(res => console.log(res)),
      catchError(err => this.handleError(err, undefined)
    ));
  }

  getUserById(id: number): Observable<User> {

    return this.http.get<User>(`http://localhost:3000/api/users/${id}`).pipe(
      tap(res => console.log(res)),
      catchError(err => this.handleError(err, undefined)
      ));
  }


  private handleError(error: Error, errorValue: any){
    console.error("UNE ERREUR" + error);
    return of(errorValue);
  }

}
