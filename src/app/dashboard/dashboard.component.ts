import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardService } from './dashboard.service';
import { Order } from './dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports:[IonicModule,RouterModule,CommonModule]
})
export class DashboardComponent  implements OnInit {
  ordersCount = 0;
  productsCount = 0;
  usersCount = 0;
  latestProducts:any[] = [];
  latestOrders:  Order[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getStats().subscribe(stats => {
      this.ordersCount = stats.orders;
      this.productsCount = stats.products;
      this.usersCount = stats.users;
    });

    this.dashboardService.getLatestProducts().subscribe((data) => {
      this.latestProducts = data;
    },
      (error) => {
        console.error('Error fetching products', error);
      });

    this.dashboardService.getLatestOrders().subscribe(orders => {
      this.latestOrders = orders;
    });
  }

}
