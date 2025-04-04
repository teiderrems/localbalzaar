import { Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {ProductsComponent} from './home/products/products.component';
import {ShopsComponent} from './home/shops/shops.component';

export const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    title: 'Home Page',
    children:[
      {
        path:'products',
        component:ProductsComponent,
        pathMatch:'full',
        title:'Products Page',
      },
      {
        path:'shops',
        component:ShopsComponent,
        pathMatch:'full',
        title:'Shops Page',
        data:{

        }
      }
    ]
  }
];
