import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'api/products';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.url}/${id}`;

    return this.http.get<Product>(url);
  }

  updateProduct(product: Product): any {
    return this.http
      .put(this.url, product, this.httpOptions)
      .pipe(catchError(this.handleError<Product>('updateCategory')));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.url, product, this.httpOptions)
      .pipe(catchError(this.handleError<Product>('addProduct')));
  }

  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.url}/${product.id}`;

    return this.http
      .delete<Product>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('deleteProduct id=${product.id}'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
