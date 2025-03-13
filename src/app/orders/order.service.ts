import { Injectable } from '@angular/core';
import { Order } from './order';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    { id: 1, customerName: 'John Doe', totalAmount: 250, status: 'Pending', date: new Date('2025-03-10') },
    { id: 2, customerName: 'Alice Smith', totalAmount: 120, status: 'Shipped', date: new Date('2025-03-09') },
    { id: 3, customerName: 'Michael Johnson', totalAmount: 450, status: 'Delivered', date: new Date('2025-03-08') },
    { id: 4, customerName: 'Emily Brown', totalAmount: 300, status: 'Pending', date: new Date('2025-03-07') },
    { id: 5, customerName: 'David Wilson', totalAmount: 180, status: 'Canceled', date: new Date('2025-03-06') },
    { id: 6, customerName: 'Sophia Martinez', totalAmount: 600, status: 'Shipped', date: new Date('2025-03-05') },
    { id: 7, customerName: 'James Anderson', totalAmount: 75, status: 'Delivered', date: new Date('2025-03-04') },
    { id: 8, customerName: 'Olivia Thomas', totalAmount: 220, status: 'Pending', date: new Date('2025-03-03') }
  ];
  getOrders(): Observable<Order[]> {
    return of(this.orders)
  }
  getOrderById(id: number):Observable<Order|undefined> {
    return of(this.orders.find(order => order.id === id))
  }
   addOrder(order:Order): void {
      order.id = this.orders.length + 1;
      this.orders.push(order);
    }
  updateOrder(updatedOrder: Order): void {
    const index = this.orders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      this.orders[index] = updatedOrder;
    }

  }
  deleteOrders(id: number): void {
    this.orders = this.orders.filter(order => order.id !== id)
  }

  constructor() { }
}
