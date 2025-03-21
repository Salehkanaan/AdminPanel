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
    if (this.loginService.Login(this.email, this.password)) 

      this.route.navigate(['/dashboard'])

    
  }
}
