import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  // Inject Router
  const loginService = inject(LoginService);  // Inject LoginService

  // Return true if the user is logged in, else redirect to login page
  if (loginService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;  // Return false if not logged in
  }
};
