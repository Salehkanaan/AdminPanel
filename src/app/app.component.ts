import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IonButtons } from '@ionic/angular/standalone';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AdminNavComponent } from "./admin-nav/admin-nav.component";
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [AdminNavComponent,IonicModule,RouterModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adminpanel';
}
