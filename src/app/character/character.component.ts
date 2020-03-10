import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { RegionService } from '../services/region.service';
import { Character } from './character';
import { Region } from './../region/region';
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
  newCharacter = new Character();

  constructor(private characterService: CharacterService, private regionService: RegionService) { }

  ngOnInit() {
    this.characterService.getAllCharacters().subscribe((data: Character[]) => {
      this.characters = data;
    });
    this.regionService.getAllRegions().subscribe((data: Region[]) => {
      this.regions = data;
    });
  }

  createCharacter() {
    this.characterService.createCharacter(this.newCharacter).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteCharacter(id: any) {
    this.characterService.deleteCharacter(id).subscribe(() => {
      this.ngOnInit();
    });
  }

}
