import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, DeadlineDialogComponent, CategoryDialogComponent } from './../pages/index';
import { Category } from './../model/category';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
        width: '300px',
        height: '300px'
    });

    dialogRef.componentInstance.closeEmitter.subscribe(() => {
        this.dialog.closeAll();
      }
    );
  }

  openTaskDialog(categories: Category[]): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
        data: categories,
        width: '600px',
        height: '600px'
    });

    dialogRef.componentInstance.closeEmitter.subscribe(() => {
        this.dialog.closeAll();
      }
    );
  }

  openTaskEditDialog(taskId: number): boolean {
    const dialogRef = this.dialog.open(DeadlineDialogComponent, {
        data: taskId,
        width: '600px',
        height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Editing was successful, return true
        return true;
      } else {
        // Editing was canceled or unsuccessful, return false
        return false;
      }
    });
  
    dialogRef.componentInstance.closeEmitter.subscribe(() => {
      this.dialog.closeAll();
    });
  
    return true; // Return false by default
  }
}