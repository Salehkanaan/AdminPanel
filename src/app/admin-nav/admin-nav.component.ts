import { Component, inject } from "@angular/core";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { MenuController } from "@ionic/angular/standalone";
import { LoginService } from "../login/login.service";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from "rxjs";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
// import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
@Component({ 
  selector: 'app-admin-nav', 
  standalone:true,
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  imports: [IonicModule,
     CommonModule,
      RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
})
export class AdminNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor( private router:Router, private menu:MenuController,private loginservice:LoginService){}


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
       map(result => result.matches),
      shareReplay()
    );
  openMenu() {
    this.menu.open();
  }

  closeMenu() {
    this.menu.close();
  }

  toggleMenu() {
    this.menu.toggle();
  }
logout(){
  this.loginservice.Logout();
return this.router.navigate(['/login'])
}
}



