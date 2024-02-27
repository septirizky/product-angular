import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      //call service
      this.productService.getProduct(params['id']).subscribe((res: Product) => {
        this.product = res;
        this.form = new FormGroup({
          product_id: new FormControl(this.product.id),
          product_name: new FormControl(this.product.name),
          stock: new FormControl(this.product.stock),
          price: new FormControl(this.product.price),
          photo: new FormControl(this.product.photo),
        });
      });
    });
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const id: number = this.f.product_id.value;
    const name: string = this.f.product_name.value;
    const stock: number = this.f.stock.value;
    const price: number = this.f.price.value;
    const photo: string = this.f.photo.value;

    this.productService
      .updateProduct({ id, name, stock, price, photo } as Product)
      .subscribe(() => this.router.navigate(['product']));
  }

  ngOnInit(): void {}
}
