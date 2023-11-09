import { Component, OnInit } from '@angular/core';
import { ItemdbService } from 'src/app/services/itemdb.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { log } from 'three';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ItemdbService],
})
export class LoginComponent implements OnInit {
  constructor(private itemService: ItemdbService, private router: Router) {}

  users: User[] = [];

  noItems = [];

  userCheck = new FormGroup({
    // username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    this.itemService.getUsers().subscribe((data) => {
      // console.log(data);
      this.users = data;
    });
  }

  emailCheck: boolean = false;
  passwordCheck: boolean = false;

  userId: string;

  mayPass: boolean = false;

  access: string = "Denied";

  login() {
    // name: this.newUser.value.name!,
    // surname: this.newUser.value.surname!,
    // email: this.newUser.value.email!,
    // password: this.newUser.value.password!,

    for (var i = 0; i < this.users.length; i++) {
      // console.log(this.users[i]._id);

      if (
        this.userCheck.value.email == this.users[i].email &&
        this.userCheck.value.password == this.users[i].password 
      ) {
        this.mayPass = true;

        if(this.mayPass === true){
          this.access = "Granted"
        } else {
          this.access = "Granted"
          // console.log(this.access);
          
        }

        this.userId = this.users[i]._id || '';
        localStorage.setItem('maypass', JSON.stringify(this.access));
        localStorage.setItem('userId', this.userId);
      }
    }
  }
}
