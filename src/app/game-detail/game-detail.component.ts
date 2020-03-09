import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game/game';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'app-game',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  game: Game;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.dataService.getGameById(params.get('id')).subscribe((c: Game) => {
          this.game = c;
      });
    });

  }

}
