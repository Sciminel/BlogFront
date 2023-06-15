import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user.model';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user!: User; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  login() {

  }


  onSubmit(form: NgForm) {
    this.userService.getUserByEmail(form.value)
      .subscribe((user) => {
        localStorage.setItem('token', user[0]);
        localStorage.setItem('userId', user[1].id);
        if (user){
          this.router.navigate(['/accueil']);
        } else {
          console.log("erreur sur la connexion")
        }
      })
  }
}
