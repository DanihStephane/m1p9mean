import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants: any;

  constructor(private restaurantService: RestaurantService,
    public authService: AuthService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("loggedUser"));
    this.restaurantService.listeRestaurant().subscribe((prods:any) => {
      console.log(prods.data);
      this.restaurants = prods.data;
    });
  }

}
