import { Component } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  id: string = '';
  type: string = '';
  name: string = '';
  image: string = '';
  location: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.type = params['type'];
      this.name = params['name'];
      this.image = params['image'];
      this.location = params['location'];
      console.log(params['id'] + " " + params['type']);
    });
  }
}
