import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;
   
  private apiUrl = 'http://localhost:3000/login';
  constructor(private http:HttpClient) { }
  Login(email: string, password: string): boolean {
    if (this.http.post(this.apiUrl, { email, password })){
      this.isLoggedIn = true;
      return true
   }else{}
   return this.isLoggedIn;
  
  }
  Logout() {
   
      this.isLoggedIn = false;
      return this.isLoggedIn;
    
  }


}
