import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { AccueilComponent } from './accueil/accueil.component';


@NgModule({
  declarations: [
    AccueilComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule
  ]
})
export class UtilisateurModule { }
