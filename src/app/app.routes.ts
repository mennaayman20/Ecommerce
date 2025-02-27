import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { Component } from '@angular/core';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 📌 Authentication Routes (Lazy Loaded)
  {
    path: '',
    component: AuthLayoutComponent,
   
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),

      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () =>
          import('./pages/register/register.component').then((m) => m.RegisterComponent),
      },



      {
        path: 'forget',
        title: 'forgetPassword',
        loadComponent: () =>
          import('./pages/forgetpass/forgetpass.component').then((m) => m.ForgetpassComponent),
      },

    ],
  },

  // 📌 Main App Routes (Lazy Loaded)
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        // gaurd 3la el home
        canActivate:[authGuard]
      },
      {
        path: 'brands',
        title: 'Brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then((m) => m.BrandsComponent),
      },

      {
        path: 'wishlist',
        title: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then((m) => m.WishlistComponent),
      },
      {
        path: 'cart',
        title: 'Cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'checkout/:id',
        title: 'Checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
      },
      {
        path: 'categories',
        title: 'Categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then((m) => m.CategoriesComponent),
      },
      {
        //id مجرد variable شايل قيمة ال id
        path: 'details/:id',
        title: 'Details',
        loadComponent: () =>
          import('./pages/details/details.component').then((m) => m.DetailsComponent),
      },
      {
        path: 'products',
        title: 'Products',
        loadComponent: () =>
          import('./pages/products/products.component').then((m) => m.ProductsComponent),
      },

      {
        path: 'allorders',
        title: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then((m) => m.AllordersComponent),
      },

      {
        path: 'logout',
        title: 'Logout',
        loadComponent: () =>
          import('./pages/logout/logout.component').then((m) => m.LogoutComponent),
      },
      {
        path: '**',
        title: 'Not Found',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then((m) => m.NotfoundComponent),
      },
    ],
  },
];

