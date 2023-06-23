import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { authGuard } from '../_auth/auth.guard';
import { ArticleUpdateComponent } from './article-update/article-update.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'article/update/:id', component: ArticleUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
