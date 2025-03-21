import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports:[CommonModule]
})
export class ProductsComponent  implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService,public router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    },
      (error) => {
        console.error('Error fetching products', error);
      });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          console.log('Order deleted successfully');
         this.loadProducts();
        },
        error => {
          console.error('Error deleting order:', error);
          alert('There was an error deleting the order. Please try again.');
        }
      )
      
    }
  }

  editProduct(id: number) {
    this.router.navigate(['./products/edit', id]);
  }

}
