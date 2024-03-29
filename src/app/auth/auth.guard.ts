import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map, of, switchMap } from 'rxjs';
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
      switchMap((user) => {
        if (!user && !route.data['public']) {
          this.router.navigate(['home']);
        }

        if (!user && route.data['public']) {
          return of(true);
        }

        if (route.data['public']) {
          return of(true);
        }

        if (route.data['loggedIn']) {
          return of(true);
        }

        return this.userSrv.isAdmin().pipe(
          map((isAdmin) => {
            if (isAdmin) {
              return true;
            }

            this.router.navigate(['home']);
            return false;
          })
        );
      })
    );
  }
}
