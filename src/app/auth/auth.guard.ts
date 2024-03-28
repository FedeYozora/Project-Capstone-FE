import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSrv: AuthService,
    private userSrv: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.checkAdmin().subscribe((isAdmin: any) => {
            if (isAdmin) {
              return true;
            } else {
              return false;
            }
          });
          return this.router.createUrlTree(['']);
        }
        return this.router.createUrlTree(['']);
      })
    );
  }

  checkAdmin(): Observable<boolean> {
    return this.userSrv.isAdmin();
  }
}
