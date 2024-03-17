import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/models/auth-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLoggedIn!: AuthData | null;
  userIsAdmin!: boolean;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.userLoggedIn = user;
    });
  }

  logout() {
    this.authSrv.logout();
  }
}
