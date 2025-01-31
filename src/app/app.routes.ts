import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';


export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'home-component', component: HomeComponent},
    {path: 'customer-component', component: CustomerComponent},
    {path: 'restaurants-component',component: RestaurantsComponent}
];
