import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  newPost = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  addData(){
    // this.formData.valueChanges.subscribe(console.log);
    console.log(this.newPost.value);
    // var newPost = new FormGroup({
    //   title: new FormControl(''),
    //   author: new FormControl(''),
    //   description: new FormControl(''),
    //   type: new FormControl(''),
    //   topic: new FormControl(''),
    //   image: new FormControl(''),
    //   date: new FormControl(''),
    //   profileName: new FormControl('')
    // })
  }


}
