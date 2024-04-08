import { Injectable } from '@angular/core';
import { Task } from './../model/index';
import { Subject, Observable } from'rxjs';
import { tap } from'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../helpers/env-local';
import { ApiPaths } from './../helpers/api-paths';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    
    constructor(
        private http: HttpClient) {
    }

    //API

    getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${environment.apiUrl}/${ApiPaths.Tasks}`)
    }

    getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${environment.apiUrl}/${ApiPaths.Tasks}/` + id);
    }

    createTask(task: Task): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/${ApiPaths.Tasks}`, task);
    }

    updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${environment.apiUrl}/${ApiPaths.Tasks}`, task);
    }

    deleteTaskById(id: number): Observable<number> {
        return this.http.delete<number>(`${environment.apiUrl}/${ApiPaths.Tasks}/` + id);
    }

}