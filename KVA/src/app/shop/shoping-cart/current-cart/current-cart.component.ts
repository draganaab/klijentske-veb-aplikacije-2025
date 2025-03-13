import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop.service';
import { User, UserService } from '../../../auth/user.service';
import { Cart, CartItem, ShopCartService } from '../shopingCart.service';

@Component({
  selector: 'app-current-cart',
  templateUrl: './current-cart.component.html',
  styleUrl: './current-cart.component.css'
})
export class CurrentCartComponent implements OnInit {

  constructor(private shopCartService: ShopCartService, private shopService: ShopService, private userService: UserService) { }

  user: User = this.userService.currentUser!;
  cart!: Cart;

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem(this.userService.currentUser.email)!);
  }
// Izbrisi 1 item
  removeOneItem(item: CartItem, i: number): void {
    if (item.quantity == 1) {
      this.cart.list.splice(i, 1);
    } else {
      this.cart.list[i].quantity--;
    }
    localStorage.removeItem(`${this.user.email}`);
    localStorage.setItem(`${this.user.email}`, JSON.stringify(this.cart));
  }
// Izbrisi sve iteme
  removeAllItem(item: CartItem, i: number): void {
    this.cart.list.splice(i, 1);
    localStorage.removeItem(`${this.user.email}`);
    localStorage.setItem(`${this.user.email}`, JSON.stringify(this.cart));
  }

  formatToTwoDecimal(value: number): string {
    return value.toFixed(2);
  }

  fullPriceCart(cart: Cart): number {
    var fullPrice: number = 0;
    cart.list.forEach(item => {
      fullPrice += item.price * item.quantity;
    });
    return fullPrice;
  }

// Dugme za order
  OrderCart(): void {
    let cart: Cart = JSON.parse(localStorage.getItem(this.userService.currentUser.email)!);
    cart.state = "reserved";

    var maxId: number = 0;
    ShopCartService.cartList.forEach(order => {
      if (order.user.email == cart.user.email) {
        if (maxId < order.id) {
          maxId = order.id;
        }
      }
    });
    var id = ++maxId;
    cart.id = id;
    var time = new Date();
    time.setSeconds(time.getSeconds() + 5); //tajmer koji simulira vreme gledanja filma od trenutka rezervacije 

    this.shopCartService.addToCartList(cart, time);
    localStorage.removeItem(`${this.user.email}`);
    this.cart = null!;
    console.log("lista korpi posle:");
    console.log(ShopCartService.cartList);
  }
}
