import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Cart, CartItem, ShopCartService } from '../shopingCart.service';
import { Item, ShopService } from '../../shop.service';
import { User, UserService } from '../../../auth/user.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-watched-cart',
  templateUrl: './watched-cart.component.html', 
  styleUrl: './watched-cart.component.css'
})
export class ArivedCartComponent implements OnInit  {
  @ViewChildren('comment') comments!: QueryList<any>;

  constructor(private shopCartService: ShopCartService, private shopService: ShopService, private userService: UserService) {
    this.user = this.userService.currentUser!;
    
  }

  user: User = this.userService.currentUser!;

  orders: Array<Cart>= [];


  ngOnInit(): void {
    this.shopCartService.cartListUpdated.subscribe(cartList => {
      this.orders = cartList.filter(order => order.state === 'watched' && order.user.email === this.user.email);
    });

    this.orders = ShopCartService.cartList.filter(order => order.state === 'watched' && order.user.email === this.user.email);
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

  onSubmit(form: NgForm, Item: CartItem) {
    console.log(form.value.comment);
    console.log(form.value.starRating);
    ShopService.itemList.forEach(cart => {
      if (cart.id == Item.item.id) {
        if (form.value.starRating != 0) {
          var isUserRating = cart.ratings.find(rating => rating.user == this.userService.currentUser.email);
          if (isUserRating) {
            isUserRating.review == form.value.starRating;
          } else {
            cart.ratings.push({ user: this.userService.currentUser.email, review: form.value.starRating });
          }
        }

        if (form.value.comment != "") {
          var isUserReviews = cart.reviews.find(review => review.user == this.userService.currentUser.email);
          if (isUserReviews) {
            isUserReviews.review == form.value.comment;
          } else {
            console.log(typeof(form.value.comment));
            cart.reviews.push({ user: this.userService.currentUser.email, review: form.value.comment });
          }
        }
      }
      this.shopCartService.emitItemList();
    });
    console.log(Item.item.id);
    console.log("list posle rejtinga");
    console.log(ShopService.itemList);
  }
}
