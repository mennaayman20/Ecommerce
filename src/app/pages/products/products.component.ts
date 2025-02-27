import { Product } from './../../shared/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  private readonly productsService=inject(ProductsService)
  private readonly cartService=inject(CartService)
  private readonly toastrService=inject(ToastrService)

  Products:Iproduct[]=[]

  getAll():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.Products=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

  addToCart(id:string):void{

    this.cartService.addProductToCart(id).subscribe({
    
      next:(res)=>{
    
        console.log(res)
        if(res.status==='success'){
          this.toastrService.success(res.message ,'FreshCart');
           this.cartService.cartNumber.next(res.numOfCartItems)
        }
       
      },
      error:(err)=>{
    console.log(err)
      }
    })
    
    }
}
