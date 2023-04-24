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

  allItems: Items[] = [];


  ngOnInit() {
    this.itemService.getAllItems().subscribe((data) => {
      console.log(data);
      
      this.allItems = data;
    })
  //  this.allItems = this.itemService.getAllItems()
  }



  get Items() {
      return this.allItems;
    }
}
