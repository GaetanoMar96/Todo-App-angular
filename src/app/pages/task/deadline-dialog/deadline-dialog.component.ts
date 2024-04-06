import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, Task } from './../../../model/index';
import { TaskService } from './../../../service/index';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-deadline-dialog',
  templateUrl: './deadline-dialog.component.html',
  styleUrls: ['./deadline-dialog.component.scss']
})
export class DeadlineDialogComponent {
  @Output() closeEmitter = new EventEmitter<boolean>();

  deadline: Date;
  deadlineTime: string = '00:00:00';
  taskId: number = 0;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DeadlineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {

    this.taskId = data;
    this.deadline = new Date();
  }

  onCancelClick(): void {
    this.dialogRef.close(false); // Editing canceled or unsuccessful
  }

  onSaveClick(): void {
    const datePipe = new DatePipe('en-US');
    const formattedDateTime = datePipe.transform(this.deadline + 'T' + this.deadlineTime, 'yyyy-MM-ddTHH:mm:ss');
    if (formattedDateTime) {
      this.taskService.updateTaskDeadlineById(this.taskId, new Date(formattedDateTime))
      .subscribe(
          {
            next: (value) => {
              this.dialogRef.close(true); // Editing successful
            },
            error: (err) => {
              console.error('Error updating task deadline:', err);
              this.dialogRef.close(false); // Editing unsuccessful
            }
          }
        )
    } else {
      this.dialogRef.close(false); // Editing unsuccessful
    }
  }
}