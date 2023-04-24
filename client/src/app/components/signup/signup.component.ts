import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ItemdbService } from 'src/app/services/itemdb.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ItemdbService],
})
export class SignupComponent {
  constructor(
    private itemService: ItemdbService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  user: User[] = [];

  statusCheck: String = 'signup';
  // statusCheck: String = 'confirmed';

  newUser = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  addUser() {
    var users: User = {
      username: this.newUser.value.username!,
      name: this.newUser.value.name!,
      surname: this.newUser.value.surname!,
      email: this.newUser.value.email!,
      password: this.newUser.value.password!,
    };

    this.itemService.createNewUser(users).subscribe((item) => {
      this.user.push(item);

      this.statusCheck = 'confirmed';
    });
  }

  // var updatedAmount = parseInt(this.amount) - parseInt(this.newOrder.value.quantity!)
  // console.log(updatedAmount);
  // console.log(this.id);

  // this.itemService.updateStock(this.id, updatedAmount).subscribe((item) => {
  // })
}
