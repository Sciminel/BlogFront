import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user.model';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { HeaderComponent } from '../header/header.component';
import { HeaderService } from '../_service/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user!: User; 

  constructor(
    private userService: UserService, 
    private router: Router, 
    private authService: AuthService,
    private headerService: HeaderService) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  login() {
    this.authService.login();
    this.headerService.isUserLoggedIn.next(true);
  }


  onSubmit(form: NgForm) {
    this.userService.getUserByEmail(form.value)
      .subscribe((user) => {
        localStorage.setItem('token', user[0]);
        localStorage.setItem('userId', user[1].id);
        if (user){
          this.login();
          this.router.navigate(['/accueil']);
        } else {
          console.log("erreur sur la connexion");
        }
      })
  }
}
