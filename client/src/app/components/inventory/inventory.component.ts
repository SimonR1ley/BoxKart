import { Component, OnInit } from '@angular/core';
import { Items } from 'src/app/models/Items';
import { ItemdbService } from 'src/app/services/itemdb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [ItemdbService]
})
export class InventoryComponent implements OnInit {
  
  constructor(private itemService: ItemdbService, private router:Router){}

  filter: String = 'All';

  edit: String = 'Show';

  filterAll: String = 'Body';

  allItems: Items[] = [];

  noItems = [];

  ngOnInit() {
    this.itemService.getAllItems().subscribe((data) => {
      console.log(data);
      
      this.allItems = data;
    })
  //  this.allItems = this.itemService.getAllItems()
  }



  get Items() {
    if (this.filter === 'All') {
      return this.allItems;
    }
    if (this.filter === 'Body') {
      return this.allItems.filter((item) =>
        this.filter === 'Body' ? item.type === 'Body' : !item.type
      );
    }

    if (this.filter === 'Wheel') {
      return this.allItems.filter((item) =>
        this.filter === 'Wheel' ? item.type === 'Wheel' : !item.type
      );
    }

    if (this.filter === 'Arial') {
      return this.allItems.filter((item) =>
        this.filter === 'Arial' ? item.type === 'Arial' : !item.type
      );
    }
    if (this.filter === 'Location') {
      return this.allItems.filter((item) =>
        this.filter === 'Location' ? item.type === 'Location' : !item.type
      );
    }
    else{
      return null
    }
  }
}
