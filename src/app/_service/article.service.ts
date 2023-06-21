import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Article } from '../_model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}),
    };
    
    return this.http.get<Article[]>('http://localhost:3000/api/articles', httpOptions).pipe( 
    tap((res) => this.log(res)),
      catchError((err) => {
        return of([])
      })
    );
  }

  getArticleById(id: number): Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}),
    };

    return this.http.get<Article>('http://localhost:3000/api/articles/'+id, httpOptions).pipe( 
      tap((res) => this.log(res)),
        catchError((err) => {
          return of()
        })
      );
  }

  addArticle(article: Article): Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}),
    };
    return this.http.post<Article>('http://localhost:3000/api/articles', article, httpOptions).pipe(
      tap((res) => console.log(res)),
      catchError((err) => of())
    )
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`http://localhost:3000/api/articles/${article.id}`, article).pipe(
      tap((res) => console.log(res)),
      catchError((err) => of())
    )
  }

  deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(`http://localhost:3000/api/articles/${id}`).pipe(
      tap((res) => console.log(res)),
      catchError((err) => of())
    )
  }


  private log(res: any){
    console.table(res);
  }

  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }

}
