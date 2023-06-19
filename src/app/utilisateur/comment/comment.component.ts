import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/_model/article.model';
import { Comment } from 'src/app/_model/comment.model';
import { ArticleService } from 'src/app/_service/article.service';
import { CommentService } from 'src/app/_service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  article!: Article;

  @Input('comment')
  showComments!: boolean;

  comment!: Comment;

  comments!: Comment[];
  
  userId: string | null = localStorage.getItem('userId');

   constructor(private commentService: CommentService, private articleService: ArticleService) {}

  ngOnInit(): void {
      this.comments = this.article.Comments;
      console.log('test')
  }

  toggleComments(article: Article) {
    this.showComments = !this.showComments;
  }

  addComment(form: NgForm) {
    this.comment = form.value;
    this.comment.article_id = this.article.id;
    if (this.userId){
      this.comment.auteur = +this.userId
      this.commentService.addComment(this.comment)
        .subscribe(comment => {
          this.comments.push(comment)
          this.refreshArticles(this.comment.article_id)
        })
    }
  }


  refreshArticles(id: number) {
    this.articleService.getArticleById(id)
    .subscribe(article => {
      this.article = article;
    })

  }
}
