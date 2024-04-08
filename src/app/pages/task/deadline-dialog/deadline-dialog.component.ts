import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from './../../../service/index';
import { DatePipe } from '@angular/common';
import { Task } from './../../../model/task';

@Component({
  selector: 'app-deadline-dialog',
  templateUrl: './deadline-dialog.component.html',
  styleUrls: ['./deadline-dialog.component.scss']
})
export class DeadlineDialogComponent {
  @Output() closeEmitter = new EventEmitter<boolean>();

  taskDescription: string = '';
  deadline: Date;
  deadlineTime: string = '00:00:00';
  task: Task;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DeadlineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {

    this.task = data;
    this.deadline = new Date();
  }

  onCancelClick(): void {
    this.dialogRef.close(false); // Editing canceled or unsuccessful
  }

  onSaveClick(): void {
    const datePipe = new DatePipe('en-US');
    const formattedDateTime = datePipe.transform(this.deadline + 'T' + this.deadlineTime, 'yyyy-MM-ddTHH:mm:ss');
    if (formattedDateTime) {
      this.task.description = this.taskDescription
      this.task.deadline = formattedDateTime;
      this.taskService.updateTask(this.task)
      .subscribe(
          {
            next: (value) => {
              this.dialogRef.close(true); // Editing successful
              this.closeEmitter.emit(true);
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