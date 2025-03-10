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


  // findPrice(item: CartItem): number{
  //   return this.shopCartService.findPrice(item);
  // }
  // findPrice(item: CartItem): number{
  //   let price!: number;
  //   item.item.prices.forEach(obj => {if(obj.size == item.size){ price = obj.price}});
  //   return price*item.quantity;
  // }

  removeOneItem(item: CartItem, i: number): void {
    if (item.quantity == 1) {
      this.cart.list.splice(i, 1);
    } else {
      this.cart.list[i].quantity--;
    }
    localStorage.removeItem(`${this.user.email}`);
    localStorage.setItem(`${this.user.email}`, JSON.stringify(this.cart));
  }

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
  // fullPriceCart(cart: Cart): number{
  //   return this.shopCartService.fullPriceCart(cart);
  // }
  // fullPriceCart(): number{
  //   var fullPrice: number = 0;
  //   this.cart.list.forEach(item => {
  //     const price = this.findPrice(item);

  //     if (price) {
  //       fullPrice += (price * item.quantity);
  //     }
  //   });
  //   return fullPrice;
  // }

  OrderCart(): void {
    console.log("lista korpi pre:");
    console.log(ShopCartService.cartList);
    let cart: Cart = JSON.parse(localStorage.getItem(this.userService.currentUser.email)!);
    cart.state = "sending";

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
    time.setSeconds(time.getSeconds() + 5);

    this.shopCartService.addToCartList(cart, time);
    localStorage.removeItem(`${this.user.email}`);
    this.cart = null!;
    console.log("lista korpi posle:");
    console.log(ShopCartService.cartList);
  }
}
