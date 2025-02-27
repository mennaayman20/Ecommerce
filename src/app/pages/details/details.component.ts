import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [ CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

productId:any;

productDetails :Iproduct={} as Iproduct

//اسحب ال id
// اوصل لل  id بال activatedroute
private readonly activatedRoute= inject(ActivatedRoute)
private readonly cartService=inject(CartService);
private readonly productsService =inject(ProductsService)
private readonly toastrService=inject(ToastrService);

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (res)=>{

this.productId=res.get('id');
console.log(this.productId);
this.productsService.getSpecificProducts(this.productId).subscribe({

  next:(res)=>{

this.productDetails=res.data

  },
  error:(err)=>{

    console.log(err)
  }


})

    },
    error(err){
      console.log(err)
    }
  })
}

addToCart(id:string):void{

  this.cartService.addProductToCart(id).subscribe({
  
    next:(res)=>{
  
      console.log(res)
      if(res.status==='success'){
         this.toastrService.success(res.message ,'FreshCart')
      }
     
    },
    error:(err)=>{
  console.log(err)
    }
  })
  
  }

}
