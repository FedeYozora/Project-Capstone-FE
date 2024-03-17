import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSrv.restore();
  }

  login(form: NgForm) {
    try {
      this.authSrv.login(form.value).subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      });
    } catch (error) {
      alert('Login errato!');
      this.router.navigate(['/login']);
    }
  }
}
