import { log } from 'three';
import { Component, OnInit } from '@angular/core';
import { Items } from 'src/app/models/Items';
import { ItemdbService } from 'src/app/services/itemdb.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Injectable, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ItemdbService]
})

export class HeaderComponent {

  

  constructor(private itemService: ItemdbService, private router:Router){}

  page: String = '';

  storageName: string = "userId"

  user: any = localStorage.getItem("maypass");

  allUsers: User[] = [];

  isValid: string = "NoAccess";



  ngOnInit() {
    this.itemService.getUsers().subscribe((data) => {
      // console.log(data);/
      this.allUsers = data;
    })

    // console.log(this.user.toString());

    if (this.user === "Granted") {
      console.log("Granted");
    } else {
      console.log("Not Granted");
    }
  }

  // get Users() {
  //     // return this.allUsers.filter((item) =>
  //     // item.username == this.user ? this.isValid = "Granted" : this.isValid = "NoAccess"
  //     // );

  //     if (this.user === "Granted") {
  //       return this.allUsers.filter((item) =>
  //         this.filter === 'Body' ? item.type === 'Body' : !item.type
  //       );
  //     }

  // }

  logout(){
    localStorage.clear()
    console.log("Hello");
    
  }

  test(){
    console.log(this.user, this.isValid, this.allUsers[1].username);
     
  }

}
