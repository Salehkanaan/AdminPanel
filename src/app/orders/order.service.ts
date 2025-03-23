import { Injectable } from '@angular/core';
import { Order } from './order.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public apiUrl = 'http://localhost:3000/orders';
  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
 
  getOrderById(id: number): Observable<Order|undefined> {
    console.log(id)
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: Order): Observable<Order|any> {

    return this.http.post<Order>(`${this.apiUrl}/new`, order);
  }

  updateOrder(updatedOrder: Order): Observable<Order> {

    return this.http.put<Order>(`${this.apiUrl}/${updatedOrder.id}`, updatedOrder)
  }

  deleteOrders(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}





