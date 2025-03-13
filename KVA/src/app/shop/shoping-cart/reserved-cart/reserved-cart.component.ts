import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cart, timeWatched, ShopCartService } from '../shopingCart.service';
import { ShopService } from '../../shop.service';
import { Subscription } from 'rxjs';
import { User, UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-reserved-cart',
  templateUrl: './reserved-cart.component.html',
  styleUrl: './reserved-cart.component.css'
})
export class ShippingCartComponent implements OnInit{
  @ViewChild('progressBar') progressBar!: ElementRef;

  constructor(private shopCartService: ShopCartService, private shopService: ShopService, private userService: UserService) {
    this.user = this.userService.currentUser!;
    
  }

  user: User = this.userService.currentUser!;
  itemWatchedList: Array<timeWatched>=[];
  orders: Array<Cart>= [];
  progress: Array<{id: number, progress: number}> =[];

  ngOnInit(): void {
    this.orders = ShopCartService.cartList.filter(order => order.state === 'reserved' && order.user.email === this.user.email);
    this.shopCartService.ItemWatchedList.subscribe(itemWatchedList => {
      this.itemWatchedList = itemWatchedList.filter(order => 
        order.order.state === 'sending' && order.order.user.email === this.user.email
      );
    });
    console.log("lista glupa: ");
    console.log(this.itemWatchedList);

    this.shopCartService.cartListUpdated.subscribe(cartList => {
      this.orders = cartList.filter(order => order.state === 'reserved' && order.user.email === this.user.email);
      cartList.forEach(order => { if(order.state === 'reserved' && order.user.email === this.user.email){
        this.progress.push({id: order.id, progress: 0});

      }})
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
