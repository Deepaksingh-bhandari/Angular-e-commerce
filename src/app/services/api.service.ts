import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { Product } from '../components/products/product/Product-Interface';
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http:HttpClient) {

   }
   productsUrl="https://fakestoreapi.com/products"
   
   getProduct(){
     console.log("get Product function called")
     return this.http.get<Product[]>(this.productsUrl).pipe(
       map((res:Product[])=>{
         console.log(res)
         return res;
       }))
   }
}
