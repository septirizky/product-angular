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
        photo:
          'https://e7.pngegg.com/pngimages/341/466/png-clipart-led-backlit-lcd-soundbar-television-set-4k-resolution-tv-led-television-blue.png',
      },
      {
        id: 2,
        name: 'Televisi',
        stock: 20,
        price: 5000000,
        photo:
          'https://dlcdnwebimgs.asus.com/gain/5d3b0e30-c888-481c-8c1c-f45b65c5b560/',
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
