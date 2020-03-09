import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from './game';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  faTrash = faTrash;
  games: Game[] = [];
  newGame = new Game();

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getAllGames().subscribe((data: Game[]) => {
      this.games = data;
    });
  }

  createGame() {
    this.gameService.createGame(this.newGame).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteGame(id: any) {
    this.gameService.deleteGame(id).subscribe(() => {
      this.ngOnInit();
    });
  }

}
