import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Game } from './game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games = [];
  newGame = new Game();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllGames().subscribe((data: any[]) => {
      this.games = data;
    });
  }

  createGame() {
    this.dataService.createGame(this.newGame).subscribe((data: any[]) => {
      this.ngOnInit();
    });
  }

  deleteGame(id: any) {
    this.dataService.deleteGame(id).subscribe((data: any[]) => {
      this.ngOnInit();
    });
  }

}
