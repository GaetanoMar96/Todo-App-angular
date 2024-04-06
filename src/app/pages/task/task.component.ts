import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Task, Category } from './../../model/index';
import { DialogService, TaskService, CategoryService } from './../../service/index';
import { Subscription } from'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy  {

  tasks: Task[] = []
  categories: Category[] = []

  private taskSubscription: Subscription = new Subscription();
  private categorySubscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) { 
  }

  ngOnInit(): void {

    this.categorySubscription = this.categoryService.getAllCategories()
    .subscribe(
      {
        next: (value) => this.categories = value,
        error: (err) => console.log(err)
      }
    )

    this.taskSubscription = this.taskService.getAllTasks()
    .subscribe(
      {
        next: (value) => {
          this.tasks = value
          console.log(this.tasks)},
        error: (err) => console.log(err)
      }
    )
  }

  refreshTaskList() {
    this.taskSubscription = this.taskService.getAllTasks().subscribe(
      {
        next: (value) => {
          this.tasks = value;
          console.log(this.tasks);
        },
        error: (err) => console.log(err)
      }
    );
  }

  deleteTask(id: number) {
    this.taskService.deleteTaskById(id)
    .subscribe(
      {
        next: (id) => {
          console.log(id)
          this.refreshTaskList(); //if the record was deleted
        },
        error: (err) => console.log(err)
      }
    )
  }

  updateTask(id: number) {
    this.dialogService.openTaskEditDialog(id);
    this.refreshTaskList();
  }

  openTaskDialog() {
    this.dialogService.openTaskDialog(this.categories);
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();  
    }
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();  
    }
  }

}
