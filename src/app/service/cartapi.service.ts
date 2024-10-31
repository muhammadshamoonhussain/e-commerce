import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  cartData: any[] = [];
  product = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage(); // Load cart from local storage when the service is initialized
  }

  // Method to load cart from localStorage
  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartData');
    if (savedCart) {
      this.cartData = JSON.parse(savedCart);
      this.product.next(this.cartData); // Update the BehaviorSubject with the data
    }
  }

  // Get the cart data as an observable
  getproduct(){
    return this.product.asObservable();
  }




  // Add a product to the cart and save it to localStorage
  addtocart(pro: any) {
    this.cartData.push(pro);
    this.product.next(this.cartData);
    this.saveCartToLocalStorage(); // Save the updated cart to localStorage
  }

  // Calculate total price of the cart
  getTotal() {
    let total = 0;
    this.cartData.forEach((a: any) => {
      const price = parseFloat(a.price.replace('Rs:','').trim());
        total += price
    });
    return total;
  }
  saveData(data: any) {
    return this.http.post('/assets/db.json', data);
  }

  // Remove a product from the cart and update localStorage
  removeproduct(pro: any) {
    this.cartData = this.cartData.filter((a: any) => a.id !== pro.id);
    this.product.next(this.cartData);
    this.saveCartToLocalStorage(); // Save the updated cart to localStorage
  }

  // Remove all products from the cart and clear localStorage
  removeallproduct() {
    this.cartData = [];
    this.product.next(this.cartData);
    this.saveCartToLocalStorage(); // Clear the cart in localStorage
  }

  // Save the cart data to localStorage
  private saveCartToLocalStorage() {
    localStorage.setItem('cartData', JSON.stringify(this.cartData));
  }
}
