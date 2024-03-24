import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4201/users';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }

  getUsers(): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.get(this.apiUrl, { headers });
  }

  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }

    return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
      map((response) => {
        const element = response.role;
        if (element === 'ADMIN') {
          return element;
        } else return;
      })
    );
  }

  getValidUser(): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
        map((response) => {
          // check if the token is still valid, for example by checking the expiration date
          if (this.isTokenValid(response)) {
            return response;
          } else {
            // token is not valid, remove it from local storage
            localStorage.removeItem('user');
            return null;
          }
        })
      );
    } else {
      return of(null);
    }
  }

  isTokenValid(user: any): boolean {
    // check the expiration date of the token
    const expirationDate = user.exp;
    return Date.now() < expirationDate;
  }

  removeUser(id: string) {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  uploadImage(data: any): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.patch(`${this.apiUrl}/me/uploadAvatar`, data, {
      headers,
      responseType: 'text',
    });
  }
}
