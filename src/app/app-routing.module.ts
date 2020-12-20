import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CocktailComponent} from '../cocktail/cocktail.component';

const routes: Routes = [
  { path:'**', redirectTo: '/cocktail', pathMatch: 'full'},
  { path: '', redirectTo: '/cocktail', pathMatch: 'full'},
  { path:'cocktail',component: CocktailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
