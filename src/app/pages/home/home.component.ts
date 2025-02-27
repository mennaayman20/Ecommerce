import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { CategoriesService } from '../../core/services/category/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
@Component({
  selector: 'app-home',
  imports: [CarouselModule ,UpperCasePipe ,LowerCasePipe ,TitleCasePipe , CurrencyPipe , SlicePipe , DatePipe , JsonPipe ,FormsModule,  SearchPipe , RouterLinkActive , RouterLink  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

private readonly productsService=inject(ProductsService);


private readonly categoriesService=inject(CategoriesService);

private readonly cartService=inject(CartService);
private readonly toastrService=inject(ToastrService);




myDate:any= new Date();

searchText:string='';

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 5
    }
  },
  nav: true
}

customMainSlider: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:4000,
  navText: ['', ''],
  items:1,
  nav: true
}

products:Iproduct[]=[]
AllCatogries:Icategory[]=[]



getProductsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
  this.products=res.data;
    }
    
  });
}


getAllCatogries():void{
  //show loading
  
  this.categoriesService.getAllCatgories().subscribe({
    next:(res)=>{
console.log(res.data)
this.AllCatogries=res.data;


    },


  })
}



ngOnInit(): void {
  
this.getProductsData();
this.getAllCatogries();

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
