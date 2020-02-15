import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot, 
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../login/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class SecureInnerPages implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      window.alert('You should log out to access this page ');
      this.router.navigate(['dashboard']);
    } 
    return true;
  }
}
