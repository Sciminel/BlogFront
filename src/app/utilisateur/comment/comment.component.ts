import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/_model/article.model';
import { Comment } from 'src/app/_model/comment.model';
import { User } from 'src/app/_model/user.model';
import { ArticleService } from 'src/app/_service/article.service';
import { CommentService } from 'src/app/_service/comment.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  article!: Article;

  @Input()
  user!: User;

  @Output() 
  commentAdded: EventEmitter<void> = new EventEmitter<void>();

  showComments!: boolean;

  comment!: Comment;

  comments!: Comment[];
  
  userId: string | null = localStorage.getItem('userId');

   constructor(private commentService: CommentService, private articleService: ArticleService, private userService: UserService) {}

  ngOnInit(): void {
      this.comments = this.article.Comments;
  }

  toggleComments(article: Article) {
    this.showComments = !this.showComments;
  }

  addComment(form: NgForm) {
    this.comment = form.value;
    this.comment.article_id = this.article.id;
    if (this.userId){
      this.comment.auteur = +this.userId;
      this.commentService.addComment(this.comment)
        .subscribe(comment => {
          this.comments.push(comment);
          this.article.Comments = this.comments;
          form.reset();
          this.commentAdded.emit();
        })
    }
  }

  updateComment(comment: Comment) {
    console.log(comment)
  }


  refreshArticles(id: number) {
    this.articleService.getArticleById(id)
    .subscribe(article => {
      this.article = article;
    })

  }
}
