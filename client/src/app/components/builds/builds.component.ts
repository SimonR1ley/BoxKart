import { Component } from '@angular/core';
import { Builds } from 'src/app/models/build';
import { Router } from '@angular/router';
import { ItemdbService } from 'src/app/services/itemdb.service';
import { BuildService } from 'src/app/services/build.service';
import { log } from 'three';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css'],
  providers: [ItemdbService]
})
export class BuildsComponent {

  constructor(private itemService: ItemdbService, private router: Router, private build: BuildService ) {}


  listOfBuilds: Builds[] = []

  ngOnInit() {
    this.build.getAllBuilds().subscribe((data) => {
      this.listOfBuilds = data
    });
    console.log(this.listOfBuilds);
  }




  get Items() {
      return this.listOfBuilds;
  }

}
