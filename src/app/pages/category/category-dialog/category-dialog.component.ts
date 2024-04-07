import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from './../../../model/index';
import { CategoryService } from './../../../service/index';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  @Output() closeEmitter = new EventEmitter<boolean>();

  categoryName: string = '';
  categoryDescription: string = '';

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryDialogComponent>
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

    const category: Category = {
      name: this.categoryName,
      description: this.categoryDescription,
    };

    this.categoryService.createCategory(category).subscribe(
      {
        next: () => {
          this.dialogRef.close(true);
          this.closeEmitter.emit(true)
        },
        error: (err) => {
          console.error('Error creating category:', err);
          this.dialogRef.close(false);
        }
      }
    )
  }
}