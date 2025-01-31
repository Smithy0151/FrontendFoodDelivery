import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  orders: any[] = [];
  customers: any[] = [];
  restaurants: any[] = [];
  payments: any[] = [];
  menuItems: any[] = [];
  
  selectedCustomerId: number = 0;
  selectedRestaurantId: number = 0;
  selectedPaymentId: number = 0;
  selectedMenuItems: any[] = []; // To store the selected menu items

  quantity: number = 1;
  price: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchOrders();

    this.apiService.getCustomers().subscribe((data) => {
      this.customers = data;
    });

    this.apiService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
    });

    this.apiService.getPayments().subscribe((data) => {
      this.payments = data;
    });

    this.apiService.getMenuItems().subscribe((data) => {
      console.log('Menu Items:', data);
      this.menuItems = data;
    });
  }

  // Fetch customer orders (if necessary)
  fetchOrders(): void {
    this.apiService.getOrders().subscribe(
      (data) => {
        this.orders = data;  // Store fetched orders
        console.log('Orders:', data);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  submitOrder(): void {
    // Make sure the payment is set and not null
    if (this.selectedPaymentId == null) {
      console.error('Payment method is not selected.');
      return; // prevent submission if payment is not selected
    }
  
    // Create the order object
    const order = { 
      customer: { id: this.selectedCustomerId },
      restaurant: { id: this.selectedRestaurantId },
      totalPrice: this.calculateTotalPrice(),
      status: 'PENDING',
      orderItems: this.selectedMenuItems.map(item => ({
        menuItem: { id: item.id },  // Ensure `menuItem` is properly mapped
        quantity: item.quantity,    // Ensure `quantity` is correct
        price: item.price,          // Ensure `price` is correct
      })), // Ensuring correct format
      payment: { id: this.selectedPaymentId }
    };
    
    

    console.log(JSON.stringify(order));
  
    this.apiService.createOrder(order).subscribe(
      (response) => {
        console.log('Order created successfully', response);
      },
      (error) => {
        console.error('Error creating order', error);
      }
    );
  }
  
  

  calculateTotalPrice(): number {
    return this.selectedMenuItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  addMenuItem(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedMenuItemId = Number(selectElement.value);
    
    const menuItem = this.menuItems.find(item => item.id === selectedMenuItemId);
  
    if (menuItem) {
      const existingItem = this.selectedMenuItems.find(item => item.id === menuItem.id);
  
      if (existingItem) {
        existingItem.quantity += this.quantity;
      } else {
        this.selectedMenuItems.push({
          id: menuItem.id, 
          name: menuItem.name,
          quantity: this.quantity,
          price: menuItem.price
        });
      }
    } else {
      console.error('No menu item found with ID:', selectedMenuItemId);
    }
  }
  
}
