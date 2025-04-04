import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import CreateProductDto from '../../../dtos/products/CreateProductDto';
import UpdateProductDto from '../../../dtos/products/UpdateProductDto';
import {ProductDto} from '../../../dtos/products/ProductDto';
import {PaginationResponseDto} from '../../../dtos/PaginationResponseDto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, @Inject('API_BASE_URL')private baseUrl:string) { }

  findAll(limit: number=20,offset:number=0,search?:string): Observable<PaginationResponseDto<ProductDto>> {
    return this.http.get<PaginationResponseDto<ProductDto>>(`${this.baseUrl}/products?limit=${limit}&offset=${offset}&search=${search??''}`);
  }

  findOne(id:number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.baseUrl}/products/${id}`);
  }

  addProduct(product:CreateProductDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`,product);
  }
  deleteProduct(id:number){
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  updateProduct(id:number,product:UpdateProductDto){
    return this.http.put(`${this.baseUrl}/products/${id}`,product);
  }
}
