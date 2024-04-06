import { Injectable } from '@angular/core';
import { Category } from './../model/index';
import { BehaviorSubject, Observable } from'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../helpers/env-local';
import { ApiPaths } from './../helpers/api-paths';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
    
    //TODO add cache for categories to refresh whena new one is created or deleted 
    
    constructor(
        private http: HttpClient) {
    }

    //API

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${environment.apiUrl}/${ApiPaths.Categories}`);
    }

    createCategory(category: Category): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/${ApiPaths.Categories}`, category);
    }

    deleteCategoryById(id: number): Observable<number> {
        return this.http.delete<number>(`${environment.apiUrl}/${ApiPaths.Categories}` + id);
    }

}