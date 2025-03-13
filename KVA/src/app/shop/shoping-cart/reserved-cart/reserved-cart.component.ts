import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cart, ShopCartService } from '../shopingCart.service';
import { ShopService } from '../../shop.service';
import { Subscription } from 'rxjs';
import { User, UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-reserved-cart',
  templateUrl: './reserved-cart.component.html',
  styleUrl: './reserved-cart.component.css'
})
export class ReservedCartComponent implements OnInit{
  

  constructor(private shopCartService: ShopCartService, private shopService: ShopService, private userService: UserService) {
    this.user = this.userService.currentUser!;
  }

  user: User = this.userService.currentUser!;
  orders: Array<Cart>= [];

  //Filmovi koji su rezervisani/njihova cena itd
  ngOnInit(): void {
    this.orders = ShopCartService.cartList.filter(order => order.state === 'reserved' && order.user.email === this.user.email);

    this.shopCartService.cartListUpdated.subscribe(cartList => {
      this.orders = cartList.filter(order => order.state === 'reserved' && order.user.email === this.user.email);
    });

  }
  
  formatToTwoDecimal(value: number): string {
    return value.toFixed(2);
  }

  fullPriceCart(cart: Cart): number{
    var fullPrice: number = 0;
    cart.list.forEach(item => {
        fullPrice += item.price*item.quantity;
    });
    return fullPrice;
  }

// Otkazi/canceled rezervisan film
  cancel(cart: Cart): void {
    const index = ShopCartService.cartList.findIndex(c => c.id === cart.id && cart.state == "reserved");
    if (index !== -1) {
      ShopCartService.cartList.splice(index, 1);
      this.orders.splice(index, 1);
      cart.state = "canceled";
      ShopCartService.cartList.push(cart);
      this.shopCartService.emitCanceled(index);
    }
  }
}
