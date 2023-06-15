import { Component, OnInit } from '@angular/core';
import { User } from '../_model/users.model';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user!: User; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  login() {

  }


  onSubmit() {
    this.userService.getUserByEmail(this.user)
      .subscribe(user => {
        console.log(user);
        this.router.navigate(['/accueil']);
      })
  }
}
