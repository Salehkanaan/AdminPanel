import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[RouterModule,FormsModule,]
})
export class LoginComponent implements OnInit {
email:string='';
password:string='';
  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {}
  login() {
    // Use subscribe to handle the Observable returned by Login()
    this.loginService.Login(this.email, this.password).subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          // If login is successful, navigate to the dashboard
          this.route.navigate(['/dashboard']);
        } else {
          console.log('Login failed');
          // Optionally show an error message
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }
}
