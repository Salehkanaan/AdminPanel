import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient){}
  public apiUrl = 'https://adminpanel-ly6v.onrender.com/products';

  getProducts(): Observable<Product[]> {
     return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {

       return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product) : Observable<Product|any>{
     return this.http.post<Product>(`${this.apiUrl}/new`, product);
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
      return this.http.put<Product>(`${this.apiUrl}/${updatedProduct.id}`, updatedProduct)
    
  }

  deleteProduct(id: number):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
}
}
