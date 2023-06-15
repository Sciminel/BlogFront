import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user.model';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  user!: User; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    this.userService.addUser(form.value)
      .subscribe(user => {
        this.router.navigate(['/login']);
      })
  }

}
