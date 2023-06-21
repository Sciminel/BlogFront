import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/_model/article.model';
import { ArticleService } from 'src/app/_service/article.service';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit{

  myForm!: FormGroup;

  article!: Article;

  constructor(
      private router: Router,
      private route: ActivatedRoute, 
      private articleService: ArticleService,
      private fb: FormBuilder,
      ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(+id).subscribe((article => {
        
        this.myForm = this.fb.group( {
          titre: [article.titre, null],
          contenu: [article.contenu, null],
          image: [article.image, null]
        } )
        this.article = article;
    }))
    }
  }

  onSubmitForm() {
    this.article = this.myForm.value;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.article.id = +id;
    }
    this.articleService.updateArticle(this.article)
      .subscribe(article => {
        console.log(article);
        this.router.navigate(['/accueil']);
      })
  }


  checkFile($event: any) {

  }
}
