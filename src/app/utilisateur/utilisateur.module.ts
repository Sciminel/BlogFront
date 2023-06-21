import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { AsideProfileComponent } from './aside-profile/aside-profile.component';
import { ArticleListComponent } from './blog-list/article-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';


@NgModule({
  declarations: [
    AccueilComponent,
    AsideProfileComponent,
    ArticleListComponent,
    CommentComponent,
    ArticleUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UtilisateurRoutingModule
  ]
})
export class UtilisateurModule { }
