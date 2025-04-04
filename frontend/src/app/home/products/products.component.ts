import { Component, inject, OnInit } from '@angular/core';
import {ProductStore} from '../../../store/products';

import {MatCardModule} from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {CurrencyPipe} from '@angular/common';
import { ProductItemComponent } from "./product-item/product-item.component";

@Component({
  selector: 'app-products',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductStore],
})
export class ProductsComponent implements OnInit {

 productStore=inject(ProductStore)
  constructor() {}

  ngOnInit(): void {
    this.productStore.findAll({limit:10, offset:1})
  }
  findAll(){
    this.productStore.findAll({limit:10, offset:1});
  }
}
