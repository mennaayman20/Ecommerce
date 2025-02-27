import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  private readonly categoriesService= inject(CategoriesService)

allCategories:Icategory[]=[]

  show():void{
    this.categoriesService.getAllCatgories().subscribe({
      next:(res)=>{
        console.log(res);
        this.allCategories = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.show();
  }

}
