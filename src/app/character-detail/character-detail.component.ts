import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CharacterService } from '../services/character.service'
import { CityService } from '../services/city.service'
import { Character } from '../_models/character'
import { City } from '../_models/city'
import { Subscription } from 'rxjs'
import { Socket } from 'ngx-socket-io'
import { RegionService } from '../services/region.service'
import { Region, Type } from '../_models/region'

@Component({
  selector: 'app-character',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  // Character information
  character: Character;
  city: City;

  // Pathfinding stream
  stations: string[] = [];
  currentStatus: string = 'IDLE';
  private _charSub: Subscription;

  // Region selection
  regions: Region[] = [];
  currentPage = 1;
  pageLimit = 10;
  typeSelection: Type[] = [undefined, Type.grass, Type.mountain, Type.mountainpeak, Type.sand, Type.snow, Type.water];
  searchName: string;
  searchType: Type;

  constructor (private characterService: CharacterService, private cityService: CityService, private route: ActivatedRoute, private socket: Socket, private regionService: RegionService) { }

  ngOnInit () {
    this._charSub = this.characterService.currentStation.subscribe(c => {
      this.stations.unshift(c)
    })

    this.route.paramMap.subscribe(params => {
      this.characterService.getCharacterById(params.get('id')).subscribe(
        (c: Character) => {
          this.character = c

          this.cityService.getCityById(this.character.regionId, this.character.cityId).subscribe(
            (ci: City) => {
              this.city = ci
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

  ngOnDestroy () {
    this._charSub.unsubscribe()
  }

  loadNextPage () {
    this.regionService.getRegionByParams(this.currentPage, this.pageLimit, this.searchName, this.searchType, true).subscribe((data: Region[]) => {
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
    this.characterService.moveCharacterToCity(cityId, this.character._id).subscribe(() => {
      this.currentStatus = 'Traveling'
    },
    (err: Error) => {
      alert(err.message)
    })
  }
}
