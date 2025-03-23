import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order } from '../order.interface';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-orderform',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule,

  ]
})
export class OrderformComponent implements OnInit {
  order$!: Observable<Order | undefined>;

  order: Order = {
    id: 0,
    customerName: '',
    totalAmount: 0,
    status: '',
    date: new Date(),
  };
  isUpdate: boolean = false;
  isEditing: boolean = false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    let id: number = 0;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('id')); 
    });
    if (id) {
      this.isEditing = true;
      this.isUpdate = true;
      this.orderService.getOrderById(id).subscribe((order) => {
        if (order) this.order = order;
        else{console.log("order not found")}
      });
    }
  }
  successMessage: string = '';
  errorMessage: string = '';

  saveOrder() {
    if (this.isEditing) {
      this.orderService.updateOrder(this.order).subscribe(
        response => {
          this.successMessage = 'Order updated successfully!';
          console.log(response);
        },
        error => {
          this.errorMessage = 'Error updating order';
          console.error(error);
        }
      );
    } else {
      this.orderService.addOrder(this.order).subscribe(
        response => {
          this.successMessage = 'Order added successfully!';
          console.log(response);
        },
        error => {
          this.errorMessage = 'Error adding order';
          console.error(error);
        }
      );

    }
    this.router.navigate(['/orders']);
  }
}
