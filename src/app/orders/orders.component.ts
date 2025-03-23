import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order } from './order';
import { OrderService } from './order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  constructor(private orderService: OrderService
    , public router: Router) { }

  ngOnInit() {
    this.loadOrder();
  }
  loadOrder() {
    this.orderService.getOrders().subscribe((data) => {

      this.orders = data;  // Store the fetched orders in the orders array
    },
      (error) => {
        console.error('Error fetching orders', error);
      }
    )
  }
  deleteOrder(id: number) {
    if (confirm('Do you confirm the deletion?')) {
      this.orderService.deleteOrders(id).subscribe(
        () => {
          console.log('Order deleted successfully');
          this.loadOrder();
        },
        error => {
          console.error('Error deleting order:', error);
         }
      );
    }
    this.loadOrder();
  }
  editOrder(id: number) {
    this.router.navigate(['./orders/edit', id])
  }
}
