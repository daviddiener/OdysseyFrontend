import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { CityService } from '../services/city.service';
import { Character } from '../_models/character';
import { City } from '../_models/city';

@Component({
  selector: 'app-character',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: Character;
  city: City;

  constructor(private characterService: CharacterService, private cityService: CityService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.characterService.getCharacterById(params.get('id')).subscribe(
        (c: Character) => {
          this.character = c;

          this.cityService.getCityById(this.character.regionId, this.character.cityId).subscribe(
            (ci: City) => {
            this.city = ci;
            },
            (err: Error) => {
              alert(err.message);
            }
            );
      },
      err => {
        alert(err);
      }
      );

    });
  }

}
