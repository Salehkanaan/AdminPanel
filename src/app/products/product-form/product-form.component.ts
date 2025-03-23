import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PrerenderFallback } from '@angular/ssr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, FormsModule,]
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    description: ''
  };
  isEditing: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) { }
  product$!: Observable<Product | undefined>;

  ngOnInit() {
    let id: number = 0;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('id')); 
    });
    if (id) {
      this.isEditing = true;
      this.productService.getProductById(id).subscribe((product) => {
        if (product) this.product = product;
        else { console.log("order not found") }
      });
      

    }
  }
  successMessage: string = '';
  errorMessage: string = '';
  saveProduct() {
    if (this.isEditing) {
      this.productService.updateProduct(this.product).subscribe(
        response => {
          this.successMessage = 'product updated successfully!';
          console.log(response);
        },
        error => {
          this.errorMessage = 'Error updating product';
          console.error(error);
        }
      );;
    } else {
      this.productService.addProduct(this.product).subscribe(
        response => {
          this.successMessage = 'Product added successfully!';
          console.log(response);
        },
        error => {
          this.errorMessage = 'Error adding Product';
          console.error(error);
        }
      );;
    }
    this.router.navigate(['/products']);
  }

}
