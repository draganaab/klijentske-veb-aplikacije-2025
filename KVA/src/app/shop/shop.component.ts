import { Component, OnInit } from '@angular/core';
import { ShopCartService } from './shoping-cart/shopingCart.service';
import { ShopService } from './shop.service';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent implements OnInit{

  constructor(private shopCartService: ShopCartService, private shopService: ShopService, private userService: UserService) {}
  
  ngOnInit(): void {
    ShopService.itemListUpdated.subscribe(() => {
    });
  }
}
