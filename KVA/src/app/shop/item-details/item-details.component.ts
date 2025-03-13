import { Component, Inject } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../shop.service';

//Pokupi item(film) 
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {

    item!: Item;
    isItemEmpty!: boolean;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public itemListComponent: ItemListComponent) { }
    
    ngOnInit(): void {
      this.item = this.data.item;
      

    }

}
