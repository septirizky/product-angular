import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (v) => (this.products = v),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  addProduct() {
    this.router.navigate(['product/add']);
  }

  editProduct(id: number) {
    this.router.navigate(['product/update', id]);
  }

  deleteProduct(product: Product) {
    this.products.filter((f) => f !== product);
    this.productService.deleteProduct(product).subscribe();
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
