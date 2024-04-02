import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  private apiUrl = 'http://localhost:4201/works';

  constructor(private http: HttpClient) {}

  getWorks(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  getWorksVisibleComments(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/visible-comments?page=${page}`);
  }

  getFeaturedWorks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/featured`);
  }

  getWork(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getWorkByCommentId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/${id}`);
  }

  getWorksBySearchInput(searchInput: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/searchByName?name=${searchInput}`);
  }

  getWorksBySearchInputVisibleComments(searchInput: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/searchByNameVC?name=${searchInput}`);
  }

  sendEmail(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mail`, data);
  }

  createWork(work: any): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.post(`${this.apiUrl}`, work, {
      headers,
    });
  }

  updateWork(id: number, work: any): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.put(`${this.apiUrl}/${id}`, work, {
      headers,
    });
  }

  uploadImage(data: any): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.post(`${this.apiUrl}/uploadAvatar`, data, {
      headers,
      responseType: 'text',
    });
  }

  deleteWork(id: number): Observable<any> {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers,
    });
  }
}
