import { Component, input, signal } from '@angular/core';
import { ProductDto } from '../../../../dtos/products/ProductDto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import  { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [MatCardModule,MatButtonModule,MatIconModule,MatBadgeModule,CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  standalone: true,
  providers: [CurrencyPipe]
})
export class ProductItemComponent {

  product=input.required<ProductDto>();
  selectedProduct=signal<ProductDto | null>(null);



}
