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

  isAdmin(): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);

      return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
        map((response) => {
          const element = response.role;
          if (element === 'ADMIN') {
            return element;
          } else return;
        })
      );
    } else {
      return of(null);
    }
  }

  getValidUser(): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
        map((response) => {
          if (response) {
            return true;
          } else {
            localStorage.removeItem('user');
            return of(false);
          }
        })
      );
    } else {
      return of(false);
    }
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
