import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Product } from '../shared/product';

@Injectable() 
export class ProductsService {
  constructor(private http: HttpClient) {
  }
  
  /**
   * Load books from the static books.json data, usually an API URL.
   * 
   * @return {Observable<Product[]>} A list of books.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get('app/data/products.json') 
    .subscribe(data => {
       console.log(data);
    });
    .catch(res => console.log(res));


    // return this.http.get('app/data/products.json')
    //   .map(res => res.json().data)
    //   .catch(res => console.log(res));
  }
}