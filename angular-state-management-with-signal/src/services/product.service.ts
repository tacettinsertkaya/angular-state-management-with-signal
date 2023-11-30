import { Injectable, signal } from '@angular/core';

export interface Product {
  name: string;
  price: number;
}

@Injectable()
export class ProductService {
  products = signal<Product[]>(
    [
      { name: 'apple', price: 1.99 },
      { name: 'orange', price: 2.99 },
      { name: 'banana', price: 0.99 },
    ]
  );

  constructor() { }


  // get the products list.
  getProducts() {
    return this.products;
  }

  // add a new product to the products list.
  addProduct(product: Product) {
    this.products.set([...this.products(),
      product
    ]);
  }

  // update a product in the products list.
  updateProduct(key: number, product: Product) {
    this.products.set(this.products().map((item, i) => {
      if (i === key) {
        return product;
      }
      return item;
    }));
  }
  // delete a product from the products list.
  deleteProduct(key: number) {
    this.products.set(this.products().filter((item, i) => i !== key));
  }


}
