import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;
  constructor() { }
  Login(email: string, password: string): boolean {
    if (email === "admin@gmail.com" && password === "admin") {
      this.isLoggedIn = true;
      return true;
    }
   
    return this.isLoggedIn;
  }
  Logout() {
   
      this.isLoggedIn = false;
      return this.isLoggedIn;
    
  }


}
