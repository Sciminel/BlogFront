import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/_model/article.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @Input()
  article!: Article;
  @Output() 
  articleUpdated: EventEmitter<Article> = new EventEmitter<Article>();

  close: EventEmitter<any> = new EventEmitter<any>();
  
  closePopup() {
    this.close.emit();
  }

  
  // Méthode appelée lors de la soumission du formulaire
  updateArticle(): void {
    // Appeler votre service ou votre API pour mettre à jour l'article
    // ...
    // Émettre l'événement de mise à jour avec le nouvel article
    this.articleUpdated.emit(this.article);
  }

  checkFile($event: any) {

  }



}
