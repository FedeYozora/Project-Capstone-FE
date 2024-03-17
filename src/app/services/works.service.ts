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

  getWorks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getWork(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createWork(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, post);
  }

  updateWork(id: number, post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
