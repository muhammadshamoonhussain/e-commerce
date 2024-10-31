import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Set your base URL for laptop and mobile
  private baseUrl: string = window.location.hostname === 'localhost' ? 
                              'http://localhost:3000' : 
                              'https://e-cart-five-phi.vercel.app/?vercelToolbarCode=G4KKHJmYuHuamPz'; // Change to your local IP

  constructor(private http: HttpClient) {}

  // Contact form submission
  getContact(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, data);
  }

  // Checkout form submission
  getcheckOut(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order`, data);
  }

  // Fetch a specific product
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  // Fetch all products
  productList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // Add a new product
  addProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data);
  }
}
