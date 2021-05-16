import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CharacterService } from '../services/character.service'
import { CityService } from '../services/city.service'
import { Character } from '../_models/character'
import { City } from '../_models/city'
import { RegionService } from '../services/region.service'
import { Region, Type } from '../_models/region'
import { HttpErrorResponse } from '@angular/common/http'
import { faSync } from '@fortawesome/free-solid-svg-icons/'

@Component({
  selector: 'app-character',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  // Character information
  character: Character;
  city: City;
  region: Region;
  faSync = faSync;

  // Region selection
  regions: Region[] = [];
  currentPage = 1;
  pageLimit = 10;
  typeSelection: Type[] = [undefined, Type.grass, Type.mountain, Type.mountainpeak, Type.sand, Type.snow, Type.water];
  searchName: string;
  searchType: Type;

  // Station stream
  statusText = "Idle"

  constructor (private characterService: CharacterService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private regionService: RegionService) { }

  ngOnInit () {
    this.route.paramMap.subscribe(params => {
      this.characterService.getCharacterById(params.get('id')).subscribe(
        (c: Character) => {
          this.character = c

          if(this.character.cityId != '-'){
            this.cityService.getCityById(this.character.regionId, this.character.cityId).subscribe(
              (ci: City) => {
                this.city = ci
                this.statusText = "Idle"
              },
              (err: Error) => {
                alert(err.message)
              }
            )
          }
         
          this.regionService.getRegionById(this.character.regionId).subscribe(
            (re: Region) => {
              this.region = re
            },
            (err: Error) => {
              alert(err.message)
            }
          )
        },
        err => {
          alert(err)
        }
      )
    })
  }

  loadNextPage () {
    this.regionService.getRegionByParams(this.currentPage, this.pageLimit, this.searchName, this.searchType, true).subscribe(
      (data: Region[]) => {
      this.regions = this.regions.concat(data)
      },
      (err: Error) => {
        alert(err.message)
      })
    this.currentPage++
  }

  searchRegions () {
    this.currentPage = 1
    this.regions = []
    this.loadNextPage()
  }

  moveToCity (cityId: string) {
    this.characterService.moveCharacterToCity(cityId, this.character._id).subscribe(
      (c) => {
        this.statusText = c.message
      },
      (err: Error) => {
        alert(err.message)
      }
    );
  }

  goToMap (id: String) {
    this.router.navigate(['/worldmap'], { queryParams: { id: id } })
  }
}
