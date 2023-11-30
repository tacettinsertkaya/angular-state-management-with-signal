import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Product, ProductService } from '../services/product.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


// app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  providers: [ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // products list by signal
  products = this.productService.getProducts();
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.createForm()
  }



  // add or update a product
  save() {
    const key = this.form.value.key;
    this.submitted = true;
    if (key)
      this.update();
    else
      this.add();
  }


  // add a new product
  add() {
    if (this.form.invalid) {
      return;
    }
    const product = {
      name: this.form.value.name,
      price: this.form.value.price
    } as Product;

    this.productService.addProduct(product);
    this.reset();
  }


  // edit a product
  edit(key: number, product: any) {
    this.form.patchValue({
      key: key,
      name: product.name,
      price: product.price,
      submitted: false
    })
  }


  // update a product
  update() {
    if (this.form.invalid) {
      return;
    }
    const key = this.form.value.key;
    const product = {
      name: this.form.value.name,
      price: this.form.value.price
    } as Product;

    this.productService.updateProduct(key, product);
    this.reset();

  }

  // delete a product
  remove(key: number) {
    this.productService.deleteProduct(key);
  }



  // Computed signal to calculate the all products total price
  totalPrice = computed(() => {
    return this.products().reduce((acc, curr) => acc + curr.price, 0);
  });


  // create form
  createForm() {
    this.form = this.formBuilder.group({
      key: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  // reset form
  reset = () => {
    this.form.reset();
    this.submitted = false;
  }

  // get form controls
  get f() { return this.form.controls; }


}
