import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    console.log(`getting products`);
    console.log(this.http.get<Product[]>(this.productsUrl));
    return this.http.get<Product[]>(this.productsUrl);
  }
}