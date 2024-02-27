import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const products = [
      {
        id: 1,
        name: 'Laptop',
        stock: 20,
        price: 7000000,
        photo: './assets/laptop.png',
      },
      {
        id: 2,
        name: 'Televisi',
        stock: 20,
        price: 5000000,
        photo: './assets/tv.png',
      },
    ];

    return { products };
  }

  genId(products: Product[]): number {
    return products.length > 0
      ? Math.max(...products.map((c) => c.id)) + 1
      : 11;
  }
}
