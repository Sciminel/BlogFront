import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { HeaderService } from '../_service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isSignUp: boolean = false;
  isConnected: boolean = false;

  constructor(private router: Router, private auth: AuthService, private headerService: HeaderService) {

    this.headerService.isUserLoggedIn.subscribe( value => {
      this.isConnected = value;
    })
  }

  ngOnInit(): void {
    this.isSignUp = this.router.url.includes('/login');
  }

  changeRoute() {
    if (this.isSignUp) {
      this.router.navigate(['/login']);
      this.isSignUp = false;
    } else {
      this.router.navigate(['/signup']);
      this.isSignUp = true;
    }
  }

  logout() {
    this.auth.logout();
    this.isConnected = this.auth.isAuthenticated();
    this.isSignUp = false;
    this.router.navigate(['/login']);
    console.log(this.isConnected);
  }

}
