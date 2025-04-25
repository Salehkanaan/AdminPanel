import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLoggedIn: boolean = false;
   
  public apiUrl = 'https://adminpanel-ly6v.onrender.com/login';
  constructor(private http:HttpClient) { }
  Login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ message: string }>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        // Check if login was successful
        if (response.message === 'Login successful') {
          this.isLoggedIn = true;
          return true;
        }
        this.isLoggedIn = false;
        return false;
      }),
      catchError(() => {
        this.isLoggedIn = false;
        return [false]; // Handle errors gracefully
      })
    );
  }
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  Logout() {
   
      this.isLoggedIn = false;
      return this.isLoggedIn;
    
  }


}
