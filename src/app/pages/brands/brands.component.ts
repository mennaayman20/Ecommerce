import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { error } from 'console';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  private readonly brandsService=inject(BrandsService)

  brands:Ibrands[]=[]

  getBrands():void{
    this.brandsService.getBrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.brands=res.data
      },
      error:(err)=>{
        console.log(err);
      }

    })
  }

  ngOnInit(): void {
    this.getBrands()
  }

}
