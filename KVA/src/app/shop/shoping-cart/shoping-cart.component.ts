import { Component } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { Router } from '@angular/router';
import { ShopCartService } from './shopingCart.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrl: './shoping-cart.component.css'
})
export class ShopingCartComponent {
  constructor(private shopCartService: ShopCartService, private userService: UserService, private router: Router) {
    // this.shopCartService.updateitemArrivalList();
    if(this.userService.currentUser == undefined){
      this.router.navigate(['/login']);
    }
  }
}
