import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        component:HomeComponent,
        data: {
            title: 'Home'
        },
        title: 'Home',
        children: [
            {
                path:'login',
                component:LoginComponent,
                data: {
                    title: 'Login'
                },
                title: 'Login',
                pathMatch:'full'
            },
            {
                path:'register',
                component:RegisterComponent,
                data: {
                    title: 'Register'
                },
                title: 'Register',
                pathMatch:'full'
            },
            {
                path:'products',
                component:ProductComponent,
                data: {
                    title: 'Products'
                },
                title: 'Products',
                pathMatch:'full'
            },
            {
                path:'product/:id',
                component:ProductComponent,
                data: {
                    title: 'Product Details'
                },
                title: 'Product Details',
                pathMatch:'full'
            },
            {
                path:'shops',
                component:ShopComponent,
                data: {
                    title: 'Shops'
                },
                title: 'Shops',
                pathMatch:'full'
            },
            {
                path:'shops/:id',
                component:ShopComponent,
                data: {
                    title: 'Shop Details'
                },
                title: 'Shop Details',
                pathMatch:'full'
            }
        ]

    },
    {
        path: '**',
        component:NotFoundComponent,
        data: {
            title: 'Not Found'
        },
        title: 'Not Found',
        pathMatch:'full'
    }
];
