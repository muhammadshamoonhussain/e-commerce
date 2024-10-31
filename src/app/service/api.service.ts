import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Set your base URL for laptop and mobile
  private baseUrl: string = window.location.hostname === 'localhost' ? 
                              'https://muhammadshamoonhussain.github.io/json/db.json' : 
                              
                              ''; // Change to your local IP
 private baseUrll: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Contact form submission
  getContact(data: any): Observable<any> {
    return this.http.post(`${this.baseUrll}/contact`, data);
  }

  // Checkout form submission
  getcheckOut(data: any): Observable<any> {
    return this.http.post(`${this.baseUrll}/order`, data);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      map((data: any) => data.products.find((product: any) => product.id === id)) // Adjust according to your JSON structure
    );
  }

  // Fetch all products
  productList(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      map((data: any) => data.products) // Adjust according to your JSON structure
    );
  }

  // Add a new product
  // Note: You cannot add products to a static JSON file directly; you would need a backend API for this.
  addProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data); // This won't work without a backend
  }
}
