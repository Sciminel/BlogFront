import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/_model/article.model';
import { User } from 'src/app/_model/user.model';
import { ArticleService } from 'src/app/_service/article.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{

  articles!: Article[];

  article!: Article;

  user!: User;

  @Input('test')
  nameFile: string = '';

  showComments: boolean = false;

  userId: string | null = localStorage.getItem('userId');

  constructor(private articleService: ArticleService, private userService: UserService) {}

  ngOnInit(): void {
      this.articleService.getAllArticles()
        .subscribe(articles => {
          this.articles = articles;
          console.log(this.articles)
          this.articles.forEach(el => {
            console.log(el)
          })
        })
  }

  checkFile($event: any) {
    this.nameFile = URL.createObjectURL($event.target.files[0]);
    console.log($event.target.files[0])
  }

  addArticle(form: NgForm) {
    this.article = form.value;
    this.article.image = this.nameFile;

    if (this.userId) {

      this.article.auteur = +this.userId;
      this.articleService.addArticle(this.article)
      .subscribe(article => {
        this.articles.push(article)
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
      this.nameFile = '';
    });
  }

}
