import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Task, Category } from './../../model/index';
import { DialogService, TaskService, CategoryService } from './../../service/index';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  tasks: Task[] = []
  categories: Category[] = []
  dataSource: MatTableDataSource<Task>;

  private taskSubscription: Subscription = new Subscription();
  private categorySubscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) {
    this.dataSource = new MatTableDataSource<Task>([])
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
            this.dataSource.data = this.tasks
          },
          error: (err) => console.log(err)
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  refreshTaskList() {
    this.taskSubscription = this.taskService.getAllTasks().subscribe(
      {
        next: (value) => {
          this.tasks = value;
          this.dataSource.data = this.tasks
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
            console.log(id + " task deleted")
            this.refreshTaskList(); //if the record was deleted
          },
          error: (err) => console.log(err)
        }
      )
  }

  updateTask(id: number) {
    this.dialogService.editTask(id).subscribe((success: boolean) => {
      if (success) {
        // Handle success refreshing the task list
        this.refreshTaskList();
      }
    });
  }

  addTask() {
    this.dialogService.addTask(this.categories).subscribe((success: boolean) => {
      if (success) {
        // Handle success refreshing the task list
        this.refreshTaskList();
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : String(categoryId);
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
