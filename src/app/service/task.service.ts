import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../shared/serializer';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs';
import {Task} from '../model/task.model';
import {map, catchError} from 'rxjs/operators';
import {Parenttask} from '../model/parenttask.model';
import {User} from '../model/user.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private endPointURL = 'http://localhost:8081/project-management';
    private serializer = new Serializer();

    constructor(
        protected httpClient: HttpClient
    ) {
    }

    public addTask(task: Task): Observable<Task> {
        return this.httpClient
            .post<Task>(`${this.endPointURL}/tasks`, task)
            .pipe(
                map(data => data),
                catchError(this.handleError)
            );
    }

    public updateTask(task: Task): Observable<Task> {
        return this.httpClient
            .put<Task>(`${this.endPointURL}/tasks`, task)
            .pipe(
                map(data => data),
                catchError(this.handleError)
            );
    }

    public deleteTask(id: number): Observable<Task> {
        return this.httpClient
            .delete<Task>(`${this.endPointURL}/tasks` + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getTask(): Observable<Task[]> {
        return this.httpClient
            .get<Task[]>(`${this.endPointURL}/tasks`)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getParentTask(): Observable<Parenttask[]> {
        return this.httpClient
            .get<Parenttask[]>(`${this.endPointURL}/tasks/parenttasks`)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getTaskById(id: number): Observable<Task> {
        return this.httpClient
            .get<Task>(`${this.endPointURL}/tasks` + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getTaskByProjectId(id: number): Observable<Task[]> {
        return this.httpClient
            .get<Task[]>(`${this.endPointURL}/tasks/project` + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    public sortProject(searchString: string): Observable<User[]> {
        return this.httpClient
            .get<User[]>(`${this.endPointURL}/tasks/sort` + '/' + searchString)
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
