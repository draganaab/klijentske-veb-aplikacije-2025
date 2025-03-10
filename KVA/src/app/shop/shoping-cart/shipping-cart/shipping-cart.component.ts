import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cart, timeWatched, ShopCartService } from '../shopingCart.service';
import { ShopService } from '../../shop.service';
import { Subscription } from 'rxjs';
import { User, UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-shipping-cart',
  templateUrl: './shipping-cart.component.html',
  styleUrl: './shipping-cart.component.css'
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
    this.orders = ShopCartService.cartList.filter(order => order.state === 'sending' && order.user.email === this.user.email);
    this.shopCartService.ItemWatchedList.subscribe(itemWatchedList => {
      this.itemWatchedList = itemWatchedList.filter(order => 
        order.order.state === 'sending' && order.order.user.email === this.user.email
      );
    });
    console.log("lista glupa: ");
    console.log(this.itemWatchedList);

    this.shopCartService.cartListUpdated.subscribe(cartList => {
      this.orders = cartList.filter(order => order.state === 'sending' && order.user.email === this.user.email);
      cartList.forEach(order => { if(order.state === 'sending' && order.user.email === this.user.email){
        this.progress.push({id: order.id, progress: 0});
        // if(this.itemWatchedList.length > 0){
        //   this.calculateProgress(order);
        // }
      }})
    });

    // this.orders = ShopCartService.cartList.filter(order => order.state === 'sending' && order.user.email === this.user.email);
    // this.cart = JSON.parse(localStorage.getItem(this.userService.currentUser.email)!);
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

  calculateProgress(order: Cart): void{
    // let found = this.itemWatchedList.find((item) => item.order.id == order.id)!;
    // let item = this.progress.find((item) => item.id == order.id)!;
    // let now = new Date;
    // let timeDiff = (found.time.getTime() - now.getTime())/1000;
    // var proggresUnit = 100/timeDiff;
    // const progressBarElement: HTMLProgressElement | null = this.progressBar?.nativeElement?.querySelector(`#progressBar${order.id}`);
    // var time = setInterval(() => {
    //   if (item.progress >= 100) {
    //     clearInterval(time);
    //   }
    //   console.log("progres: " + item.progress);
    //   item.progress +=proggresUnit;
    //   progressBarElement!.value = item.progress;
    // }, 1000);
  }

  // findProgressVal(order: Cart): void{
  //   console.log(this.progress);
  //   console.log(order.id);
  //   let found = this.itemWatchedList.find((item) => item.order.id == order.id)!;
  //   let item = this.progress.find((item) => item.id == order.id)!;
  //   let now = new Date;
  //   let timeDiff = (found.time.getTime() - now.getTime())/1000;
  //   var proggresUnit = 15;
  //   var counter: number = 0;
  //   if (item.progress >= 100) {
  //     return;
  //   }else{
  //     const time = setInterval(() => {
  //       // Increment progress by progress unit
  //       item.progress += proggresUnit;
  
  //       // If progress reaches or exceeds 100, clear the interval
  //       if (item.progress >= 100) {
  //         clearInterval(time);
  //       }
  //     }, 1000);
  //   }
  // }

  cancel(cart: Cart): void {
    const index = ShopCartService.cartList.findIndex(c => c.id === cart.id && cart.state == "sending");
    if (index !== -1) {
      ShopCartService.cartList.splice(index, 1);
      this.orders.splice(index, 1);
      cart.state = "canceled";
      ShopCartService.cartList.push(cart);
      this.shopCartService.emitCanceled(index);
    }
  }
}
