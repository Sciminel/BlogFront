import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectToUrl!: string;

  constructor() { }

  login() {

  }


  logout() {
    this.isLoggedIn = false;
  }
  
}
