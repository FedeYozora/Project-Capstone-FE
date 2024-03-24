import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = 'http://localhost:4201/comments';

  constructor(private http: HttpClient) {}

  getCommentsForWork(workId: number) {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.get<Comment[]>(`${this.apiUrl}/works/${workId}`, {
      headers,
    });
  }

  getVisibleCommentsForWork(workId: number) {
    return this.http.get<Comment[]>(`${this.apiUrl}/works/${workId}/visible`);
  }

  getAllComments() {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.get<Comment[]>(`${this.apiUrl}`, {
      headers,
    });
  }

  getVisibleComments() {
    return this.http.get<Comment[]>(`${this.apiUrl}/visible`);
  }

  deleteComment(commentId: number) {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.delete(`${this.apiUrl}/${commentId}`, {
      headers,
    });
  }

  updateComment(commentId: number, comment: Comment) {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.put(`${this.apiUrl}/${commentId}`, comment, {
      headers,
    });
  }

  createComment(comment: Comment) {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
    }
    return this.http.post(`${this.apiUrl}?workId=${comment.workId}`, comment, {
      headers,
    });
  }
}
