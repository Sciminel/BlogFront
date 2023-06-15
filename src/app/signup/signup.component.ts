import { Component, OnInit } from '@angular/core';
import { User } from '../_model/users.model';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  user!: User; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit() {
    this.userService.addUser(this.user)
      .subscribe(user => {
        console.log(user);
        this.router.navigate(['/login']);
      })
  }

}
