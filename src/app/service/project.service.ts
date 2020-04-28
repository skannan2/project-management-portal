import { Injectable } from '@angular/core';
import {Serializer} from '../shared/serializer';
import {HttpClient} from '@angular/common/http';
import {Project} from '../model/project.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private endPointURL = 'http://localhost:8081/project-management/projects';
  private serializer = new Serializer();

  constructor(protected httpClient: HttpClient) { }

  public addProject(project: Project): Observable<Project> {
    return this.httpClient
        .post<Project>(`${this.endPointURL}`, project)
        .pipe(
            map(data => data),
            catchError(this.handleError)
        );
  }

  public updateProject(project: Project): Observable<Project> {
    return this.httpClient
        .put<Project>(`${this.endPointURL}`, project)
        .pipe(
            map(data => data),
            catchError(this.handleError)
        );
  }

  public deleteProject(id: number): Observable<Project> {
    return this.httpClient
        .delete<Project>(`${this.endPointURL}` + '/' + id)
        .pipe(
            catchError(this.handleError)
        );
  }

  public getProject(): Observable<Project[]> {
    return this.httpClient
        .get<Project[]>(`${this.endPointURL}`)
        .pipe(
            catchError(this.handleError)
        );
  }

  public sortProject(searchString: string): Observable<User[]> {
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
