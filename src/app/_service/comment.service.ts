import { Injectable } from '@angular/core';
import { Comment } from '../_model/comment.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  addComment(comment: Comment): Observable<Comment> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}),
    };
    return this.http.post<Comment>('http://localhost:3000/api/comments', comment, httpOptions).pipe(
      tap((res) => console.log(res)),
      catchError((err) => of())
    )
  }
}
