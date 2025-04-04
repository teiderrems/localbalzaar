import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { PaginationResponseDto } from '../../dtos/PaginationResponseDto';
import { ProductDto } from '../../dtos/products/ProductDto';
import {computed, inject } from '@angular/core';
import { ProductsService } from '../../app/home/products/products.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import {HttpErrorResponse} from '@angular/common/http';
import CreateProductDto from '../../dtos/products/CreateProductDto';
import UpdateProductDto from '../../dtos/products/UpdateProductDto';
import {QueryDto} from '../../dtos/QueryDto';

type ProductState = {
    products: PaginationResponseDto<ProductDto>;
    currentProduct?: ProductDto;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: string;
}

const initialState: ProductState = {
  isError:false,
  isLoading:false,
  isSuccess:false,
  error:'',
  currentProduct: undefined,
  products:{
      data:[],
      total:0,
      pageSize:20
  }
}

export  const  ProductStore=signalStore(
  withState(initialState),
  withProps(()=>({
    productService:inject(ProductsService)
  })),
  withComputed(({products})=>({
    total:computed(()=>products.total),
    pageSize:computed(()=>products.pageSize)
  })),
  withMethods(({productService,...store}) => ({
    findAll:rxMethod<QueryDto>(
      pipe(
        tap(()=>patchState(store,state => ({...state,isLoading:true}))),
        switchMap(({limit,offset})=>productService.findAll(limit,offset,undefined).pipe(
          tapResponse({
            next:(value:PaginationResponseDto<ProductDto>)=>patchState(store,(state) => ({...state,products:value,isSuccess:true})),
            error:(error:HttpErrorResponse)=>patchState(store,(state)=>({...state,isError:true,error:error.message})),
            finalize:()=>patchState(store,(state)=>({...state,isLoading:false}))
          })
        ))
    )),
    searchProduct:rxMethod<QueryDto>(
      pipe(
        debounceTime(5_000),
        tap(()=>patchState(store,state => ({...state,isLoading:true}))),
        switchMap(({limit,offset,query})=>productService.findAll(limit,offset,query).pipe(
          tapResponse({
            next:(value:PaginationResponseDto<ProductDto>)=>patchState(store,(state) => ({...state,products:value,isSuccess:true})),
            error:(error:HttpErrorResponse)=>patchState(store,(state)=>({...state,isError:true,error:error.message})),
            finalize:()=>patchState(store,(state)=>({...state,isLoading:false}))
          })
        ))
    )),
    findOne:rxMethod<number>(
      pipe(
        tap(()=>patchState(store,state => ({...state,isLoading:true}))),
        switchMap((id)=>productService.findOne(id).pipe(
          tapResponse({
            next:(value:ProductDto)=>patchState(store,(state) => ({...state,currentProduct:value,isSuccess:true})),
            error:(error:HttpErrorResponse)=>patchState(store,(state)=>({...state,isError:true,error:error.message})),
            finalize:()=>patchState(store,(state)=>({...state,isLoading:false}))
          })
        ))
      )),
    addProduct:(createProductDto:CreateProductDto)=>rxMethod<void>(
      pipe(
        tap(()=>patchState(store,state => ({...state,isLoading:true}))),
        switchMap(()=>productService.addProduct(createProductDto).pipe(
          tapResponse({
            next:(value)=>patchState(store,(state) => ({...state,isSuccess:true})),
            error:(error:HttpErrorResponse)=>patchState(store,(state)=>({...state,isError:true,error:error.message})),
            finalize:()=>patchState(store,(state)=>({...state,isLoading:false}))
          })
        ))
      )),
    updateProduct:rxMethod<UpdateProductDto>(
      pipe(
        tap(()=>patchState(store,state => ({...state,isLoading:true}))),
        switchMap((updateProductDto)=>productService.updateProduct(updateProductDto.id,updateProductDto).pipe(
          tapResponse({
            next:(value)=>patchState(store,(state) => ({...state,isSuccess:true})),
            error:(error:HttpErrorResponse)=>patchState(store,(state)=>({...state,isError:true,error:error.message})),
            finalize:()=>patchState(store,(state)=>({...state,isLoading:false}))
          })
        ))
      )),
    deleteProduct:rxMethod<number>(
      pipe(
        tap(()=>patchState(store,state => ({...state,isLoading:true}))),
        switchMap((id)=>productService.deleteProduct(id).pipe(
          tapResponse({
            next:(value)=>patchState(store,(state) => ({...state,isSuccess:true})),
            error:(error:HttpErrorResponse)=>patchState(store,(state)=>({...state,isError:true,error:error.message})),
            finalize:()=>patchState(store,(state)=>({...state,isLoading:false}))
          })
        ))
      ))
  }))
)
