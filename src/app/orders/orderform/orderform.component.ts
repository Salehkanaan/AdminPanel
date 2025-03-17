import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonEngine } from '@angular/ssr/node';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IonDatetime } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-orderform',
  standalone: true,
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.scss'],
  imports:[CommonModule,FormsModule,RouterModule,
    
  ]
})
export class OrderformComponent  implements OnInit {
  order$!: Observable<Order | undefined>;

  order: Order = {
    id: 0,
    customerName:'',
    totalAmount: 0,
    status:'',
    date: new Date(),
    };
    isUpdate:boolean=false;
    isEditing: boolean = false;
   
    constructor(
      private orderService: OrderService,
      private route: ActivatedRoute,
      public router: Router
    ) { }
  
    ngOnInit() {
      let id:number=0;
      this.route.paramMap.subscribe(params => {
        id = Number(params.get('id')); // Get the 'id' from URL and convert to number
        this.orderService.getOrderById(id).subscribe((order) => {
          if (order) this.order = order;
        }); });
      if (id) {
        this.isEditing = true;
        this.isUpdate=true;
        // let id1 = parseInt(id);
      
        // this.orderService.getOrderById(id1).subscribe((order) => {
        //   if (order) this.order = order;
        // });
      }
    }
  
    saveOrder() {
      if (this.isEditing) {
        this.orderService.updateOrder(this.order);
      } else {
        this.orderService.addOrder(this.order);
      }
      this.router.navigate(['/orders']);
    }
}
