import { Injectable } from '@angular/core';
import { Category } from './../model/index';
import { BehaviorSubject, Observable, tap } from'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../helpers/env-local';
import { ApiPaths } from './../helpers/api-paths';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
    
    //cache result to avoid calling the be
    private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    
    constructor(
        private http: HttpClient) {
            this.loadCategories();
    }

    //API

    private loadCategories() {
        this.http.get<Category[]>(`${environment.apiUrl}/${ApiPaths.Categories}`).subscribe(
          categories => {
            this.categoriesSubject.next(categories);
          }
        );
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoriesSubject.asObservable();
    }

    createCategory(category: Category): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/${ApiPaths.Categories}`, category)
        .pipe(tap(() => this.loadCategories()));
    }

    deleteCategoryById(id: number): Observable<number> {
        return this.http.delete<number>(`${environment.apiUrl}/${ApiPaths.Categories}/` + id)
        .pipe(tap(() => this.loadCategories()));
    }

}