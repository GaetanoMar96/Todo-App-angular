import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Task, Category } from './../../model/index';
import { DialogService, TaskService, CategoryService } from './../../service/index';
import { Subscription } from'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy  {

  categories: Category[] = []

  private categorySubscription: Subscription = new Subscription();

  constructor(
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
  }

  refreshCategoryList() {
    this.categorySubscription = this.categoryService.getAllCategories().subscribe(
      {
        next: (value) => {
          this.categories = value;
        },
        error: (err) => console.log(err)
      }
    );
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategoryById(id)
    .subscribe(
      {
        next: (id) => {
          console.log(id)
          this.refreshCategoryList(); //if the record was deleted
        },
        error: (err) => console.log(err)
      }
    )
  }

  addCategory() {
    this.dialogService.openCategoryDialog();
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();  
    }
  }

}
