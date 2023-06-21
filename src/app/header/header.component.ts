import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isSignUp: boolean = false;
  isConnected: boolean = this.auth.isAuthenticated();

  constructor(private router: Router, private auth: AuthService) {}

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
  }

}
