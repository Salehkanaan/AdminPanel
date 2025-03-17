import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
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
    id: 0, name: '',
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
      id = Number(params.get('id')); // Get the 'id' from URL and convert to number
       this.productService.getProductById(id).subscribe((product) => {
           if (product) this.product = product;
       });
    });
    if (id) {
      this.isEditing = true;
      
    }
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.isEditing = true;
    //   let id1 = parseInt(id);
    //   this.productService.getProductById(id1).subscribe((product) => {
    //     if (product) this.product = product;
    //   });
    // }
  }

  saveProduct() {
    if (this.isEditing) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.addProduct(this.product);
    }
    this.router.navigate(['/products']);
  }

}
