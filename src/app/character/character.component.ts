import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { RegionService } from '../services/region.service';
import { CityService } from '../services/city.service';
import { Character } from './character';
import { Region } from './../region/region';
import { City } from './../city/city';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  faTrash = faTrash;
  characters: Character[] = [];
  regions: Region[];
  cities: City[];
  newCharacter = new Character();

  constructor(private characterService: CharacterService, private regionService: RegionService, private cityService: CityService) { }

  ngOnInit() {
    this.characterService.getAllCharacters().subscribe((data: Character[]) => {
      this.characters = data;
    });
    this.regionService.getAllRegions().subscribe((data: Region[]) => {
      this.regions = data;
    });
  }

  updateCities(value) {
    this.cityService.getAllCities(value).subscribe((data: City[]) => {
      this.cities = data;
  });
  }

  createCharacter() {
    this.characterService.createCharacter(this.newCharacter).subscribe(() => {
      this.characterService.getAllCharacters().subscribe((data: Character[]) => {
        this.characters = data;
      });
    });
  }

  deleteCharacter(id: any) {
    this.characterService.deleteCharacter(id).subscribe(() => {
      this.characterService.getAllCharacters().subscribe((data: Character[]) => {
        this.characters = data;
      });
    });
  }

}