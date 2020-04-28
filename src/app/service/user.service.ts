import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../shared/serializer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPointURL = 'http://localhost:8081/project-management/users';
  private serializer = new Serializer();

  constructor(protected httpClient: HttpClient) { }

  public addUser(user: User): Observable<User> {
    return this.httpClient
        .post<User>(`${this.endPointURL}`, user)
        .pipe(
            map(data => data),
            catchError(this.handleError)
        );
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient
        .put<User>(`${this.endPointURL}`, user)
        .pipe(
            map(data => data),
            catchError(this.handleError)
        );
  }

  public deleteUser(id: number): Observable<User> {
    return this.httpClient
        .delete<User>(`${this.endPointURL}` + '/' + id)
        .pipe(
            catchError(this.handleError)
        );
  }

  public getUser(): Observable<User[]> {
    return this.httpClient
        .get<User[]>(`${this.endPointURL}`)
        .pipe(
            catchError(this.handleError)
        );
  }

  public sortUser(searchString: string): Observable<User[]> {
    return this.httpClient
        .get<User[]>(`${this.endPointURL}/sort` + '/' + searchString)
        .pipe(
            catchError(this.handleError)
        );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  private log(message: string) {
    console.log(message);
  }
}
