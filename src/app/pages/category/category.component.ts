import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from './../../model/index';
import { DialogService, CategoryService } from './../../service/index';
import { Subscription } from'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit  {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  categories: Category[] = []
  dataSource: MatTableDataSource<Category>;

  private categorySubscription: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) { 
    this.dataSource = new MatTableDataSource<Category>([])
  }

  ngOnInit(): void {

    this.categorySubscription = this.categoryService.getAllCategories()
    .subscribe(
      {
        next: (value) => {
          this.categories = value
          this.dataSource.data = this.categories
        },
        error: (err) => console.log(err)
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }
  
  refreshCategoryList() {
    this.categorySubscription = this.categoryService.getAllCategories().subscribe(
      {
        next: (value) => {
          this.categories = value;
          this.dataSource.data = this.categories
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
    this.dialogService.addCategory().subscribe((success: boolean) => {
        if (success) {
          // Handle success refreshing the category list
          this.refreshCategoryList();
        }
  });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();  
    }
  }

}
