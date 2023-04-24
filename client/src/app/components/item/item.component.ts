import { Component } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Items } from 'src/app/models/Items';
import { ItemdbService } from 'src/app/services/itemdb.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemdbService],
})
export class ItemComponent {
  constructor(
    private itemService: ItemdbService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  filter: String = 'manage';
  from: String = 'manage';
  to: String = 'manage';

  newStock = new FormGroup({
    qty: new FormControl(''),
  });

  id: string = '';
  type: string = '';
  name: string = '';
  image: string = '';
  qtySA: string = '';
  qtyUSA: string = '';
  qtyAus: string = '';
  qtyGarage: string = '';
  // location: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.type = params['type'];
      this.name = params['name'];
      this.image = params['image'];
      this.qtySA = params['qtySA'];
      this.qtyUSA = params['qtyUSA'];
      this.qtyAus = params['qtyAus'];
      this.qtyGarage = params['qtyGarage'];
      console.log(params['id'] + ' ' + params['type']);
    });
  }

  // updatedAmount: number = this.newStock.value.qty;

  manage() {
    if (this.to === 'SA') {
      console.log('SA');
      var updatedAmount =
        parseInt(this.qtySA) + parseInt(this.newStock.value.qty!);
      this.itemService.updateSA(this.id, updatedAmount).subscribe((item) => {});
      console.log(this.id, updatedAmount);
    }

    if (this.to === 'USA') {
      console.log('USA');
      var updatedAmount =
        parseInt(this.qtyUSA) + parseInt(this.newStock.value.qty!);
      this.itemService
        .updateUSA(this.id, updatedAmount)
        .subscribe((item) => {});
      console.log(this.id, updatedAmount);
    }

    if (this.to === 'Aus') {
      var updatedAmount =
        parseInt(this.qtyAus) + parseInt(this.newStock.value.qty!);
      this.itemService
        .updateAus(this.id, updatedAmount)
        .subscribe((item) => {});
      console.log(this.id, updatedAmount);
    }
  }

  move() {
    if (this.from === 'SA') {
      console.log('SA');
      var saAmount =
        parseInt(this.qtySA) - parseInt(this.newStock.value.qty!);

        this.itemService
          .updateSA(this.id, saAmount)
          .subscribe((item) => {});
      if (this.to === 'SA') {
        this.itemService
          .updateSA(this.id, parseInt(this.qtySA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'USA') {
        this.itemService
          .updateUSA(this.id, parseInt(this.qtyUSA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Aus') {
        this.itemService
          .updateAus(this.id, parseInt(this.qtyAus) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Garage') {
        this.itemService
          .updateGarage(this.id, parseInt(this.qtyGarage) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      // console.log(this.id, newAmount);
    }


    if (this.from === 'USA') {
      console.log('USA');
      var saAmount =
        parseInt(this.qtyUSA) - parseInt(this.newStock.value.qty!);

        this.itemService
          .updateUSA(this.id, saAmount)
          .subscribe((item) => {});
      if (this.to === 'SA') {
        this.itemService
          .updateSA(this.id, parseInt(this.qtySA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'USA') {
        this.itemService
          .updateUSA(this.id, parseInt(this.qtyUSA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Aus') {
        this.itemService
          .updateAus(this.id, parseInt(this.qtyAus) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Garage') {
        this.itemService
          .updateGarage(this.id, parseInt(this.qtyGarage) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      // console.log(this.id, newAmount);
    }


    if (this.from === 'Aus') {
      console.log('Aus');
      var saAmount =
        parseInt(this.qtyAus) - parseInt(this.newStock.value.qty!);

        this.itemService
          .updateAus(this.id, saAmount)
          .subscribe((item) => {});
      if (this.to === 'SA') {
        this.itemService
          .updateSA(this.id, parseInt(this.qtySA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'USA') {
        this.itemService
          .updateUSA(this.id, parseInt(this.qtyUSA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Aus') {
        this.itemService
          .updateAus(this.id, parseInt(this.qtyAus) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Garage') {
        this.itemService
          .updateGarage(this.id, parseInt(this.qtyGarage) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      // console.log(this.id, newAmount);
    }
   

    if (this.from === 'Garage') {
      console.log('Garage');
      var saAmount =
        parseInt(this.qtyGarage) - parseInt(this.newStock.value.qty!);

        this.itemService
          .updateGarage(this.id, saAmount)
          .subscribe((item) => {});
      if (this.to === 'SA') {
        this.itemService
          .updateSA(this.id, parseInt(this.qtySA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'USA') {
        this.itemService
          .updateUSA(this.id, parseInt(this.qtyUSA) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Aus') {
        this.itemService
          .updateAus(this.id, parseInt(this.qtyAus) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      if (this.to === 'Garage') {
        this.itemService
          .updateGarage(this.id, parseInt(this.qtyGarage) + parseInt(this.newStock.value.qty!))
          .subscribe((item) => {});
      }
      // console.log(this.id, newAmount);
    }

  
  }
}
