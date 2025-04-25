import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStats, Order, Product } from './dash-board.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http:HttpClient) { }
  public apiUrl = 'https://adminpanel-ly6v.onrender.com/products';
  public apiUrl1 = 'https://adminpanel-ly6v.onrender.com/orders';

  getLatestProducts(): Observable<Product[]> {
     return this.http.get<Product[]>(this.apiUrl);
  }

  getStats(): Observable<DashboardStats> {
    return of({
      orders: 120,
      products: 50,
      users: 30
    });
  }
  getLatestOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl1);

 
  }
}
