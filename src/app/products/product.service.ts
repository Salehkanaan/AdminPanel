import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, category: 'Electronics', description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: 800, category: 'Electronics', description: 'Latest smartphone model' },
    { id: 3, name: 'Shoes', price: 120, category: 'Fashion', description: 'Comfortable running shoes' },
    { id: 4, name: 'Smartwatch', price: 250, category: 'Electronics', description: 'Fitness tracking smartwatch with long battery life' },
    { id: 5, name: 'Wireless Headphones', price: 150, category: 'Electronics', description: 'Noise-canceling wireless headphones' },
    { id: 6, name: 'Backpack', price: 60, category: 'Accessories', description: 'Waterproof travel backpack with multiple compartments' },
    { id: 7, name: 'Gaming Keyboard', price: 110, category: 'Accessories', description: 'Mechanical RGB gaming keyboard with custom keys' },
    { id: 8, name: 'Office Chair', price: 300, category: 'Furniture', description: 'Ergonomic office chair with lumbar support' }

  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  addProduct(product: Product): void {
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }
}
