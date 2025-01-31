import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurants',
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent {
  restaurants: any[] = []; // Use 'any' instead of a typed array
  newRestaurant: any = { name: '', address: '', phone: '', menuItems: [] };
  newMenuItem: any = { name: '', description: '', price: null };

  constructor(private apiService: ApiService) {}

  // Add a menu item to the list of menu items
  addMenuItem(): void {
    if (this.newMenuItem.name && this.newMenuItem.description && this.newMenuItem.price) {
      this.newRestaurant.menuItems.push({ ...this.newMenuItem });
      this.newMenuItem = { name: '', description: '', price: null }; // Reset menu item form
    }
  }

  // Submit the restaurant with all menu items
  submitRestaurant(): void {
    if (this.newRestaurant.name && this.newRestaurant.address && this.newRestaurant.phone && this.newRestaurant.menuItems.length > 0) {
      this.apiService.createRestaurant(this.newRestaurant).subscribe(
        response => {
          console.log('Restaurant created successfully:', response);
          this.resetForm();
        },
        error => {
          console.error('Error creating restaurant:', error);
        }
      );
    }
  }

    // Reset the form
  resetForm(): void {
      this.newRestaurant = { name: '', address: '', phone: '', menuItems: [] };
      this.newMenuItem = { name: '', description: '', price: null };
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  // Load restaurants from backend
  loadRestaurants(): void {
    this.apiService.getRestaurants().subscribe(
      (data) => {
        // Add a 'showMenu' property to each restaurant to toggle menu visibility
        this.restaurants = data.map((restaurant: any) => ({
          ...restaurant,
          showMenu: false
        }));
      },
      (error) => {
        console.error('Error loading restaurants:', error);
      }
    );
  }

  // Toggle menu items visibility
  toggleMenu(restaurant: any): void {
    restaurant.showMenu = !restaurant.showMenu;
  }


}
