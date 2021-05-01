import { Component, OnInit } from '@angular/core'
import { CharacterService } from '../services/character.service'
import { RegionService } from '../services/region.service'
import { CityService } from '../services/city.service'
import { Character } from '../_models/character'
import { Region } from '../_models/region'
import { City } from '../_models/city'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  faTrash = faTrash;
  characters: Character[] = [];
  regions: Region[] = [];
  cities: City[];
  newCharacter = new Character();
  currentPage = 1;
  pageLimit = 10;

  constructor (private characterService: CharacterService,
              private regionService: RegionService,
              private cityService: CityService,
              private authenticationService: AuthenticationService) { }

  ngOnInit () {
    this.characterService.getAllCharactersByUserId(this.authenticationService.getUserDetails()._id).subscribe((data: Character[]) => {
      this.characters = data
    },
    (err: Error) => {
      alert(err.message)
    })
    this.regionService.getPartRegions(this.currentPage, this.pageLimit).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data)
    },
    (err: Error) => {
      alert(err.message)
    })
    this.currentPage++
  }

  loadNextPage () {
    this.regionService.getPartRegions(this.currentPage, this.pageLimit).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data)
    },
    (err: Error) => {
      alert(err.message)
    })
    this.currentPage++
  }

  updateCities (value) {
    this.cityService.getAllCities(value).subscribe((data: City[]) => {
      this.cities = data
    },
    (err: Error) => {
      alert(err.message)
    })
  }

  createCharacter () {
    this.characterService.createCharacter(this.newCharacter).subscribe((error) => {
      if (error) {
        if (error.code === 11000) {
          alert('Name is already taken')
        } else if (error._message) {
          alert(error._message)
        }
      }

      this.characterService.getAllCharactersByUserId(this.authenticationService.getUserDetails()._id).subscribe((data: Character[]) => {
        this.characters = data
      })
    },
    (err: Error) => {
      alert(err.message)
    })
  }

  deleteCharacter (value) {
    this.characterService.deleteCharacter(value).subscribe(() => {
      this.characterService.getAllCharactersByUserId(this.authenticationService.getUserDetails()._id).subscribe((data: Character[]) => {
        this.characters = data
      })
    },
    (err: Error) => {
      alert(err.message)
    })
  }
}
