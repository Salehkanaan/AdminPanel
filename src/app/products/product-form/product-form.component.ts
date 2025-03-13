import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, FormsModule]
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      let id1 = parseInt(id);
      this.productService.getProductById(id1).subscribe((product) => {
        if (product) this.product = product;
      });
    }
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
