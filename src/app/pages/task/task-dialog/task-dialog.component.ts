import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, Task } from './../../../model/index';
import { TaskService } from './../../../service/index';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  @Output() closeEmitter = new EventEmitter<void>();

  taskName: string = '';
  taskDescription: string = '';
  selectedCategory: string = '';
  deadline: Date;
  deadlineTime: string = '00:00:00';
  categories: Category[];

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category[]
  ) {

    this.categories = data;
    this.deadline = new Date();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const datePipe = new DatePipe('en-US');
    const formattedDateTime = datePipe.transform(this.deadline + 'T' + this.deadlineTime, 'yyyy-MM-ddTHH:mm:ss');

    const task: Task = {
      name: this.taskName,
      description: this.taskDescription,
      categoryId: Number(this.selectedCategory),
      deadline: formattedDateTime
    };
    this.taskService.createTask(task).subscribe(
      {
        next: () => {
          this.dialogRef.close(task);
        },
        error: (err) => {
          console.error('Error creating task:', err);
        }
      }
    )
    this.dialogRef.close(null);
  }
}