import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, DeadlineDialogComponent, CategoryDialogComponent } from './../pages/index';
import { Category, Task } from './../model/index';
import { Observable, Subject } from'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {

  private dialogResult: Subject<boolean> = new Subject<boolean>();

  constructor(private dialog: MatDialog) {}

  addCategory(): Observable<boolean> {
    this.openCategoryDialog();
    // Return an observable to listen to the result
    return this.dialogResult.asObservable();
  }

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
        width: '500px',
        height: '500px'
    });

    dialogRef.componentInstance.closeEmitter.subscribe((success: boolean) => {
      if(success) {
        this.dialogResult.next(true)
      }
    });
  }

  addTask(categories: Category[]): Observable<boolean> {
    this.openTaskDialog(categories);
    // Return an observable to listen to the result
    return this.dialogResult.asObservable();
  }


  openTaskDialog(categories: Category[]): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
        data: categories,
        width: '600px',
        height: '600px'
    });

    dialogRef.componentInstance.closeEmitter.subscribe((success: boolean) => {
      if(success) {
        this.dialogResult.next(true)
      }
    }
    );
  }

  editTask(task: Task): Observable<boolean> {
    this.openTaskEditDialog(task);
    // Return an observable to listen to the result
    return this.dialogResult.asObservable();
  }

  openTaskEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(DeadlineDialogComponent, {
        data: task,
        width: '600px',
        height: '600px'
    });

    dialogRef.componentInstance.closeEmitter.subscribe((success: boolean) => {
      if(success) {
        this.dialogResult.next(true)
      }
    });
  }
}