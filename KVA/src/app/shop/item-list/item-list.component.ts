import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { Item, ShopService } from '../shop.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ItemCommentsComponent } from '../item-comments/item-comments.component';
import { ShopCartService } from '../shoping-cart/shopingCart.service';
import { ItemDetailsComponent } from '../item-details/item-details.component';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit{
  constructor(private userService: UserService, private shopService: ShopService,private shopCartService: ShopCartService, public dialog: MatDialog) {
    this.items = ShopService.FinalItemList;

    ShopService.itemListUpdated.subscribe(() => {
      this.items = ShopService.FinalItemList;
      this.getPagedItems(); // Refresh odabran broj filmova
    });
  }
  
  checkSeat: any = [];
  pagedItems: Item[] = []; // Stavke za prikaz na trenutnoj stranici
  pageSize = 5; // Osnovna strana prikaza filmova
  pageEvent!: PageEvent;

  ngOnInit(): void {
    ShopService.itemListUpdated.subscribe(() => {
    });
    this.getPagedItems();
  }

  //Slanje item-a u korpu
  PassCartData(item: Item) {
    if (this.userService.currentUser != undefined || this.userService.currentUser != null) {
      if (this.checkSeat.length != 0) {
        if (this.checkSeat[1].id == item.id) {
          this.shopCartService.updateCart(this.userService.currentUser, item, this.checkSeat[0]);
        }
      }
    }
  }

  initializeItemList(): void {
    ShopService.initializeItemList(this.userService);
  }

  items = ShopService.FinalItemList;
  selectedSeatPrice: Array<any>= [null, null];

 //Prikaz rating-a (zvezdica) svakog korisnika 
  getRating(item: Item): number{
    var sum: number;
    sum=0.00;
    item.ratings.forEach(ratingVal => {
      sum += ratingVal.review;
    });
    
    return sum / item.ratings.length;
  }

//Cena na dve decimale
  formatToTwoDecimal(value: number): string {
    return value.toFixed(2);
  }

//Cena za odredjenu kart (regular/vip)  
  updateSelectedSeatPrice(event: MouseEvent, item: Item, seat: string): void {
    this.checkSeat = [seat, item];
    const clickedElement = event.target as HTMLElement;
    const parentCardContent = clickedElement.closest('mat-card-content');
    console.log(seat, item.prices);
    if (parentCardContent) {
      const attrId = parentCardContent.getAttribute('id');
      const selectedPrice = item.prices.find(price => price.seat === seat)!;
      this.selectedSeatPrice[0] = selectedPrice.price;
      this.selectedSeatPrice[1] = attrId;
    }
  }

//Prikaz selektovanog broja item-a  
  getPagedItems(): void {
    const startIndex = this.pageEvent ? this.pageEvent.pageIndex * this.pageEvent.pageSize : 0;
    const endIndex = this.pageEvent ? startIndex + this.pageEvent.pageSize : this.pageSize;
    this.pagedItems = this.items.slice(startIndex, endIndex);
  }

  openComments(item: Item){
    const profileDialog = this.dialog.open(ItemCommentsComponent, {
      disableClose: true,
      width: '50vw',
      data: {item: item}
    });
  }

  openDetails(item: Item){
    const profileDialog = this.dialog.open(ItemDetailsComponent, {
      disableClose: true,
      width: '50vw',
      data: {item: item}
    })
  }
}
