import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full'},
  { path: 'about', component: AboutComponent },
  { path: 'games', component: GameComponent },
  {path: 'games/:id' , component: GameDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
