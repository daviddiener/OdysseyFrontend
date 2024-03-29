import { Component, OnInit, ViewChild } from '@angular/core'
import { CharacterService } from '../services/character.service'
import { RegionService } from '../services/region.service'
import { CityService } from '../services/city.service'
import { Character } from '../_models/character'
import { Region } from '../_models/region'
import { City } from '../_models/city'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { AuthenticationService } from '../services/authentication.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  @ViewChild('characterForm') characterForm!: NgForm; // Define characterForm using ViewChild

  faTrash = faTrash;
  characters: Character[] = [];
  regions: Region[] = [];
  cities: City[];
  newCharacter = new Character();
  currentPage = 1;
  pageLimit = 10;
  backendErrorMessage: string;

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
    if (!this.characterForm.valid) {
      return;
    }

    this.characterService.createCharacter(this.newCharacter).subscribe({
      next: () => {
        // On success, clear the error message
        this.backendErrorMessage = '';
        
        this.characterService.getAllCharactersByUserId(this.authenticationService.getUserDetails()._id).subscribe((data: Character[]) => {
          this.characters = data
        });
      },
      error: (error) => {
        // Handle backend validation error
        this.backendErrorMessage = error.error.message || 'An unexpected error occurred.';
      }
    });
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
