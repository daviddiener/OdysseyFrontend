import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { CityService } from '../services/city.service';
import { Character } from '../character/character';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { City } from '../city/city';

@Component({
  selector: 'app-character',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  character: Character;
  city: City;

  constructor(private characterService: CharacterService, private cityService: CityService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.characterService.getCharacterById(params.get('id')).subscribe((c: Character) => {
          this.character = c;

          this.cityService.getCityById(this.character.regionId, this.character.cityId).subscribe((ci: City) => {
            this.city = ci;
        });
      });

    });
  }

}
