import { Component, Input, OnInit } from '@angular/core';
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

  @Input('test')
  nameFile: string = '';

  userId: string | null = localStorage.getItem('userId');

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
      this.articleService.getAllArticles()
        .subscribe(articles => {
          this.articles = articles;
        })
  }

  checkFile($event: any) {
    this.nameFile = URL.createObjectURL($event.target.files[0]);
  }

  addArticle(form: NgForm) {
    this.article = form.value;
    this.article.image = this.nameFile;
    if (this.userId) {
      this.article.auteur = +this.userId;
      console.log(this.article.image);
      this.articleService.addArticle(this.article)
      .subscribe(article => {
        this.articles.push(article)
        console.log(article.comments)
        this.refreshArticles();
        form.resetForm();
      })

    } else {
      console.log("Une erreur est survenu lors de l'insertion")
    }

  }


  refreshArticles() {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

}
