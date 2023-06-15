import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Article } from 'src/app/_model/article.model';
import { ArticleService } from 'src/app/_service/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{

  articles!: Article[];

  article!: Article;

  userId: string | null = localStorage.getItem('userId');

  constructor(private articleService: ArticleService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
      this.articleService.getAllArticles()
        .subscribe(articles => {
          this.articles = articles;
          this.articles.forEach(article => {
            article.image.arrayBuffer()
              .then(res => console.log(res))
            console.log()
            this.getArticleImageUrl(article.image.type)
          })
        })
  }

  addArticle(form: NgForm) {
    this.article = form.value;
    if (this.userId) {
      this.article.auteur = +this.userId
    }
    this.articleService.addArticle(this.article)
      .subscribe(article => {
        console.log(article)
      })
  }

  private getArticleImageUrl(imageData: string): string {
    return `data:image/*;base64,${imageData}`;
  }

}
