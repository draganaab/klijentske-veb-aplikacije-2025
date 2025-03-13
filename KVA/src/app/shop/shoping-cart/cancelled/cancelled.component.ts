import { Component } from '@angular/core';
import { Cart, ShopCartService } from '../shopingCart.service';
import { ShopService } from '../../shop.service';
import { User, UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrl: './cancelled.component.css'
})
export class CancelledComponent {
  constructor(private shopCartService: ShopCartService, private shopService: ShopService, private userService: UserService) {
    this.user = this.userService.currentUser!;
    
  }

  user: User = this.userService.currentUser!;
  orders: Array<Cart>= [];

//Filmovi koji su canceled/njihova cena
  ngOnInit(): void {
    this.shopCartService.cartListUpdated.subscribe(cartList => {
      this.orders = cartList.filter(order => order.state === 'canceled' && order.user.email === this.user.email);
    });

    this.orders = ShopCartService.cartList.filter(order => order.state === 'canceled' && order.user.email === this.user.email);
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
}
