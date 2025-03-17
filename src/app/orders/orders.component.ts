import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order } from './order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports:[FormsModule,CommonModule,RouterModule]
})
export class OrdersComponent  implements OnInit {
 orders:Order[]=[];
  constructor(private orderservice:OrderService,public router:Router) { }

  ngOnInit() {this.loadOrder()}
loadOrder(){
  this.orderservice.getOrders().subscribe((data)=>{
    this.orders=data
})
}
deleteOrder(id:number){
  if(confirm('Do you confirm the deletion?')){
     this.orderservice.deleteOrders(id);
     this.loadOrder()
  }
 
}
editOrder(id:number){
  this.router.navigate(['./orders/edit',id])
}
}
