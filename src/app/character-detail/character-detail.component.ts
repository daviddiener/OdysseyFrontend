import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Character } from '../character/character';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'app-character',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  character: Character;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.characterService.getCharacterById(params.get('id')).subscribe((c: Character) => {
          this.character = c;
      });
    });
  }

}
