import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from 'src/app/models/auth-data';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLoggedIn!: AuthData | null;
  userIsAdmin!: boolean;
  constructor(private authSrv: AuthService, private userSrv: UserService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.userLoggedIn = user;
      if (user) {
        this.canActivate().subscribe((isAdmin: any) => {
          if (isAdmin) {
            this.userIsAdmin = true;
          } else {
            this.userIsAdmin = false;
          }
        });
      } else {
        this.userIsAdmin = false;
      }
    });

    this.authSrv.restore();
  }

  logout() {
    this.authSrv.logout();
  }

  canActivate(): Observable<boolean> {
    return this.userSrv.isAdmin();
  }
}
