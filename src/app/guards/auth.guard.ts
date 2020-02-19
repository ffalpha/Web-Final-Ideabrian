import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,  CanActivate, Router } from '@angular/router';
import { Observable  } from 'rxjs';

import { AuthService } from '../login/services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    //this guard is active (restricts components ) if  a user is currently not logged in 
    if(this.authService.isLoggedIn !== true) {
      window.alert('You should log in to access this page ');
      this.router.navigate(['sign-in'])
    }


    return true;
  }
}
