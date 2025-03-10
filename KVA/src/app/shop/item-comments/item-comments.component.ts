import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemListComponent } from '../item-list/item-list.component';
import { Item } from '../shop.service';

@Component({
  selector: 'app-item-comments',
  templateUrl: './item-comments.component.html',
  styleUrl: './item-comments.component.css'
})

export class ItemCommentsComponent implements OnInit{

  item!: Item;
  isItemEmpty!: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public itemListComponent: ItemListComponent) { }
  
  ngOnInit(): void {
    this.item = this.data.item;
    
    if(this.item.reviews.length == 0){
      this.isItemEmpty = true;
    }else{
      this.isItemEmpty = false;
    }
  }

}
