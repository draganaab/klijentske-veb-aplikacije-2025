import { Component, Injectable } from '@angular/core';
import { Item, Prices, ShopService } from '../shop.service';
import { UserService } from '../../auth/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrl: './item-filter.component.css'
})

@Injectable()
export class ItemFilterComponent {
  constructor(private userService: UserService, private shopService: ShopService) {
    this.items = ShopService.itemList;
  }

  priceList: Array<number> = ShopService.priceList;
  typeList: Array<string> = ShopService.typeList;

  sizeList: Array<string> = ShopService.sizeList;
  brandList: Array<string> = ShopService.brandList;

  items = ShopService.itemList;
  filteredItems!: Array<Item>;

  initializeItemList(): void {
    ShopService.initializeItemList(this.userService);
  }

  onSubmit(form: NgForm){
    this.filteredItems = [];
    var counter = 0;
    console.log(form.value.name);
    console.log(form.value.minPrice);
    console.log(form.value.maxPrice);
    console.log(form.value.minRating);
    console.log(form.value.maxRating);
    console.log(form.value.fromDate);
    console.log(form.value.toDate);
    console.log(form.value.type);
    console.log(form.value.size);
    console.log(form.value.brand);
    console.log("-----------------------------------------");

    if(form.value.name==""){
      counter++;
    }else{
      this.items.forEach(element => {
        if(element.name.toLowerCase().includes(form.value.name.toLowerCase())){
          this.filteredItems.push(element);
        }
      });
    }

    if(form.value.minRating=="" && form.value.maxRating==""){
      counter++;
    }else{
      var tempFilteredItems: Array<Item> = [];
      if(form.value.minRating == ""){form.value.minRating=0;}
      if(form.value.maxRating == ""){form.value.maxRating=5;}
      if(counter ==2){this.filteredItems = this.items}
      this.filteredItems.forEach(element => {
        let found = element.ratings.find((item) => item.review >= form.value.minRating && item.review <= form.value.maxRating);
        if(found){tempFilteredItems.push(element);}
      });
      this.filteredItems = tempFilteredItems;
    }

    if(form.value.fromDate=="" && form.value.toDate==""){
      counter++;
    }else{
      var tempFilteredItems: Array<Item> = [];
      if(form.value.fromDate == ""){form.value.fromDate= new Date("2024-04-18 14:23");}
      if(form.value.toDate == ""){form.value.toDate=new Date();}
      if(counter ==3){this.filteredItems = this.items}
      this.filteredItems.forEach(element => {
        if(element.releaseDate <= form.value.toDate && element.releaseDate >= form.value.fromDate){
          tempFilteredItems.push(element);
        }
      });
      this.filteredItems = tempFilteredItems;
    }

    if(form.value.type==""){
      counter++;
    }else{
      var tempFilteredItems: Array<Item> = [];
      if(counter ==4){this.filteredItems = this.items}
      this.filteredItems.forEach(element => {
        let typeMatch = form.value.type.some((type: string) => element.type.includes(type));
        if(typeMatch){
          tempFilteredItems.push(element);
        }
      });
      this.filteredItems = tempFilteredItems;
    }


    if(form.value.price==""){
      counter++;
    }else{
      var tempFilteredItems: Array<Item> = [];
      if(counter ==6){this.filteredItems = this.items}
      this.filteredItems.forEach(element => {
        let priceMatch = form.value.price.some((price: number) => element.prices.some((pricenum) => pricenum.price === price));
        if(priceMatch){
          tempFilteredItems.push(element);
        }
      });
      this.filteredItems = tempFilteredItems;
    }

    if(counter==7){
      this.filteredItems = this.items
    }

    console.log(this.filteredItems);
    this.shopService.passFinalItemList(this.filteredItems);
  }
}
