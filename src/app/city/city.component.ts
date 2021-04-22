import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { CharacterService } from '../services/character.service';
import { ActivatedRoute } from '@angular/router';
import { City } from '../_models/city';
import { Character } from '../_models/character';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities = [];

  constructor(private cityService: CityService, private characterService: CharacterService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cities.map(obj => ({ ...obj, Active: 'false' }));


    this.route.parent.paramMap.subscribe(params => {
      this.cityService.getAllCities(params.get('id')).subscribe((data: City[]) => {
          data.forEach(element => {
            this.characterService.getAllCharactersByCityId(element._id).subscribe((chars: Character[]) => {
              this.cities.push({element, chars});
            });
          });
      });
    });
  }
}
