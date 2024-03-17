import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { RegisterData } from '../models/register-data';
import { AuthData } from '../models/auth-data';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginData } from '../models/login-data';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  baseUrl = environment.baseUrl;
  accessToken!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: RegisterData) {
    return this.http.post(`${this.baseUrl}/auth/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']), catchError(this.errors);
      })
    );
  }

  login(data: LoginData) {
    return this.http.post<AuthData>(`${this.baseUrl}/auth/login`, data).pipe(
      tap((dataLogin) => {
        this.authSubj.next(dataLogin);
        this.accessToken = dataLogin;
        localStorage.setItem('user', JSON.stringify(dataLogin));
        console.log('Login effettuato');
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      // this.router.navigate(['/login']);
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['/login']);
      return;
    }
    this.authSubj.next(userData);
    // Rientrando nell'applicazione dopo essere usciti, il BehaviourSubject è di nuovo null: in questo modo riceve i valori presenti nel localStorage e comunica di nuovo a user$ la presenza dell'utente
    console.log('User esiste, restore eseguito');
  }

  //DA CONTROLLARE LA GESTIONE ERRORI
  private errors(err: any) {
    console.log(err);
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
