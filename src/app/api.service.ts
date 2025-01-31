import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MenuItemOrder {
  menuItem: { id: number };
  quantity: number;
  price: number;
}

interface Order {
  customer: { id: number | null };
  restaurant: { id: number | null };
  payment: { id: number | null };
  totalPrice: number;
  status: string;
  orderItems: MenuItemOrder[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';  // Change the URL to match your backend's URL

  constructor(private http: HttpClient) {}

  // Get all orders (for delivery drivers to see)
  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  // Place an order (for customers)
  createOrder(order: any): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order);
  }

  // Update order status (for delivery drivers to update)
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/orders/${orderId}/status`, { status });
  }

  // Get a specific customer's orders (optional for customers)
  getCustomerOrders(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${customerId}/orders`);
  }

  // Fetch customer details (optional)
  getCustomerDetails(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers/${customerId}`);
  }

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/restaurants`);
  }

  //Add this in controller
  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/payments`);
  }

  getMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu`);
  }

    // Create a new restaurant with optional menu items
  createRestaurant(restaurant: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/restaurants`, restaurant);
  }
  
    // Add a menu item to an existing restaurant
  addMenuItem(restaurantId: number, menuItem: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/${restaurantId}/menu-items`, menuItem);
  }
}

