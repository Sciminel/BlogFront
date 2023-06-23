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

  nameFile!: File;

  name!: ArrayBuffer | undefined;

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
      if (this.userId) {
        this.userService.getUserById(+this.userId)
          .subscribe(user => {
            this.user = user;
            console.log(user)
          })
      }

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

  checkFile($event: any) {
    this.nameFile = $event.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.name = reader.result as ArrayBuffer;
      console.log(this.name)
    }
    reader.readAsDataURL(this.nameFile)
    // this.name = URL.createObjectURL(this.nameFile);
  }

  addArticle(form: NgForm) {
    this.article = form.value;
    if (this.name) {
      this.article.image = this.name;
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
    } else {
      console.log("Erreur sur l'image")
    }

  }

  updateArticle(article: Article) {
    this.articleService.updateArticle(article)
      .subscribe(article => {
        console.log(article)
      })
  }

  deleteArticle(article: Article) {
    if(confirm("Voulez vous vraiment supprimer l'article : "+ article.titre)) {
      this.articleService.deleteArticle(article.id)
      .subscribe(() => {
        this.refreshArticles();
        console.log('Supprimé')
      })
    }

  }

  refreshArticles() {
    this.articleService.getAllArticles().subscribe((articles) => {
      this.articles = articles;
    });
    this.name = undefined;
  }
}
