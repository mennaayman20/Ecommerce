import { CurrencyPipe } from '@angular/common';
import { Icart } from '../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe ,RouterLinkActive , RouterLink  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {


 private readonly cartService = inject(CartService)

 private readonly toastrService=inject(ToastrService);

 cartDetails:Icart={} as Icart;
 
getCartData():void{

  this.cartService.getLoggedUserCart().subscribe({

    next:(res)=>{
console.log(res.data)

this.cartDetails=res.data // {total price and products [{}]}

    },
    error:(err)=>{
      console.log(err)

    }
  })


}

ngOnInit(): void {
  this.getCartData()
}



removeProduct(id:string):void{
  this.cartService.removeSpecificCart(id).subscribe({

    next:(res)=>{
      console.log(res.data)
      
      this.cartDetails=res.data; // again after remove {total price and products [{}]}
      this.cartService.cartNumber.next(res.numOfCartItems)
          },
          error:(err)=>{
            console.log(err)
           
            
          }

  })
}


updateCount(id:string , newCount:number):void{
  this.cartService.updateProductQuantity( id , newCount).subscribe({
 
    next:(res)=>{
      console.log(res.data);
      
      this.cartDetails=res.data // again after remove {total price and products [{}]}
     
      
    
          },
          error:(err)=>{
            console.log(err)
           
          }

  })
}


clearCart():void{
  this.cartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
      if(res.message==='success'){
        this.cartDetails={} as Icart;

        this.cartService.cartNumber.next(0)
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}


}
