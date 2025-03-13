import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Item, ShopService } from "../shop.service";
import { User, UserService } from "../../auth/user.service";


export interface timeWatched {
    order: Cart;
    time: Date;
}

export interface CartItem {
    item: Item;
    seat: string;
    price: number;
    quantity: number;
}

export interface Cart {
    id: number;
    user: User;
    list: CartItem[];
    state: string;
}

@Injectable()
export class ShopCartService implements OnInit{

    constructor(private shopService: ShopService, private userService: UserService) { 
        this.ItemWatchedList.emit(ShopCartService.itemWatchedList);
        console.log("itemWatched list u shoping servisu "+ShopCartService.itemWatchedList);
    }

    ngOnInit(): void {
        console.log("itemWatched list u shoping servisu "+ShopCartService.itemWatchedList);
    }

    cartListUpdated = new EventEmitter<Array<Cart>>();
    ItemWatchedList = new EventEmitter<Array<timeWatched>>();
    ItemListUpdated = new EventEmitter<Array<Item>>();

    addToCartList(cart: Cart, time: Date): void {
        ShopCartService.cartList.push(cart);
        let item: timeWatched = { order: cart, time: time};
        ShopCartService.itemWatchedList.push(item);
        this.ItemWatchedList.emit(ShopCartService.itemWatchedList);
        this.cartListUpdated.emit(ShopCartService.cartList);
        // console.log("lista glupa: " + this.itemWatchedList);
        setTimeout(() => {
            const index = ShopCartService.cartList.findIndex(c => c.id === cart.id && cart.state=="reserved");
            if (index !== -1) {
                ShopCartService.cartList.splice(index, 1);
                cart.state="watched";
                ShopCartService.cartList.push(cart);
                this.cartListUpdated.emit(ShopCartService.cartList);
                this.ItemWatchedList.emit(ShopCartService.itemWatchedList);
                this.cartListUpdated.emit(ShopCartService.cartList);
            }
        }, 15000);
    }

    emitCanceled(index: number){
        this.cartListUpdated.emit(ShopCartService.cartList);
    }

    emitItemList(){
        this.ItemListUpdated.emit(ShopService.itemList);
    }



    static itemWatchedList: Array<timeWatched> =[]
    states: Array<string> = ["watched", "reserved", "canceled", "temp"];

    updateCart(user: User, item: Item, seat: string): void {
        var name: string = user.email;
        var stringCart: string | null = localStorage.getItem(`${name}`);
        if (!stringCart) {
            let quantity: number = 1;
            let price: number = this.findPrice(item, seat);
            let locCartItem: CartItem = { item, seat, price, quantity };
            let list: Array<CartItem> = [];
            list.push(locCartItem);
            let state: string = this.states[3];
            var id: number = 0;
            let locCart: Cart = { id, user, list, state };
            localStorage.removeItem(`${name}`);
            localStorage.setItem(`${name}`, JSON.stringify(locCart));
        }
        else {
            const cart: Cart = JSON.parse(stringCart);
            let foundItem = cart.list.find((cartItem: CartItem) => cartItem.item.id == item.id && cartItem.seat == seat);
            if (foundItem) {
                cart.list.forEach((cartItem: CartItem) => {
                    if (cartItem.item.id == item.id && cartItem.seat == seat) {
                        cartItem.quantity++;
                    }
                });
                localStorage.removeItem(`${name}`);
                localStorage.setItem(`${name}`, JSON.stringify(cart));
            } else {
                let quantity: number = 1;
                let price: number = this.findPrice(item, seat);
                let locCartItem: CartItem = { item, seat, price, quantity };
                cart.list.push(locCartItem);
                localStorage.removeItem(`${name}`);
                localStorage.setItem(`${name}`, JSON.stringify(cart));
            }
        }
        var test: string | null = localStorage.getItem(`${name}`)!;
        console.log(JSON.parse(test));
    }



    findPrice(item: Item, seat: string): number {
        let price!: number;
        item.prices.forEach(obj => {console.log(obj.seat, seat); if (obj.seat == seat) { price = obj.price } });
        return price;
    }

    static cartList: Array<Cart> = [];
}