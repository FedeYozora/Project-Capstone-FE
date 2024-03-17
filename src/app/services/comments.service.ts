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
    return this.http.get<Comment[]>(`${this.apiUrl}/works/${workId}`);
  }

  getAllComments() {
    return this.http.get<Comment[]>(`${this.apiUrl}`);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }

  banComments(userId: number) {
    return this.http.delete(`${this.apiUrl}?userId=${userId}`);
  }

  createComment(comment: Comment) {
    const token = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (token) {
      const tokenParsed = JSON.parse(token).accessToken;
      headers = headers.append('Authorization', `Bearer ${tokenParsed}`);
      console.log(tokenParsed);
    }
    return this.http.post(`${this.apiUrl}?workId=${comment.workId}`, comment, {
      headers,
    });
  }
}
