import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStats, Order, Product } from './dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() { }

  getStats(): Observable<DashboardStats> {
    return of({
      orders: 120,
      products: 50,
      users: 30
    });
  }

  getLatestProducts(): Observable<Product[]> {
    return of([
      { name: 'Laptop', price: '$1000', category: 'Electronics' },
      { name: 'Smartphone', price: '$800', category: 'Electronics' },
      { name: 'Shoes', price: '$120', category: 'Fashion' },
      { name: 'Watch', price: '$200', category: 'Accessories' },
      { name: 'Headphones', price: '$150', category: 'Electronics' }
    ]);
  }

  getLatestOrders(): Observable<Order[]> {
    return of([
      { id: 1, customerName: 'John Doe', totalAmount: 250, status: 'Pending', date:'2025-03-10' },
      { id: 2, customerName: 'Alice Smith', totalAmount: 120, status: 'Shipped', date: '2025-03-09' },
      { id: 3, customerName: 'Michael Johnson', totalAmount: 450, status: 'Delivered', date: '2025-03-08' },
      { id: 4, customerName: 'Emily Brown', totalAmount: 300, status: 'Pending', date: '2025-03-07' },
      { id: 5, customerName: 'David Wilson', totalAmount: 180, status: 'Canceled', date: '2025-03-06' },
    ]);
  }
}
