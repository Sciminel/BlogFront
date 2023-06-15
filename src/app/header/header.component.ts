import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isSignUp: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isSignUp = this.router.url.includes('/login')
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

}
