import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { AsideProfileComponent } from './aside-profile/aside-profile.component';
import { ArticleListComponent } from './blog-list/article-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccueilComponent,
    AsideProfileComponent,
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilisateurRoutingModule
  ]
})
export class UtilisateurModule { }
