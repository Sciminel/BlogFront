import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/_model/article.model';
import { User } from 'src/app/_model/user.model';
import { ArticleService } from 'src/app/_service/article.service';
import { CommentService } from 'src/app/_service/comment.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {

  articles!: Article[];

  article!: Article;

  user!: User;

  nameFile: string = '';

  showComments: boolean = false;

  userId: string | null = localStorage.getItem('userId');

  selectedArticle: Article | null = null;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.articles = articles;
      this.articles.forEach((el) => {
        this.fetchCommentsForArticles();
      });
    });
  }

  private fetchCommentsForArticles() {
    this.articles.forEach((article) => {
      this.articleService.getArticleById(article.id)
        .subscribe((art) => {
          article.Comments = art.Comments;
        })
    });
  }

  onCommentAdded() {
    this.fetchCommentsForArticles(); // Mettre à jour les commentaires après l'ajout d'un commentaire
  }

  openModal(article: Article) {
    this.selectedArticle = article;
  }

  checkFile($event: any) {
    this.nameFile = URL.createObjectURL($event.target.files[0]);
    console.log($event.target.files[0]);
  }

  addArticle(form: NgForm) {
    this.article = form.value;
    this.article.image = this.nameFile;

    if (this.userId) {
      this.article.auteur = +this.userId;
      this.articleService.addArticle(this.article).subscribe((article) => {
        this.articles.push(article);
        this.refreshArticles();
        form.reset();
      });
    } else {
      console.log("Une erreur est survenu lors de l'insertion");
    }
  }

  updateArticle(article: Article) {
    console.log(article.titre)
  }

  refreshArticles() {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.articles = articles;
      this.nameFile = '';
    });
  }
}
