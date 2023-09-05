import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CharacterService } from '../services/character.service'
import { CityService } from '../services/city.service'
import { Character } from '../_models/character'
import { City } from '../_models/city'
import { RegionService } from '../services/region.service'
import { LogService } from '../services/log.service'
import { Region, Type } from '../_models/region'
import { Log } from '../_models/log'
import { faSync } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-character',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent {
  // HTML
  @ViewChild('leftCol') leftCol: ElementRef;
  @ViewChild('rightCol') rightCol: ElementRef;

  // Character information
  character: Character;
  city: City;
  region: Region;
  faSync = faSync;
  statusText = 'Idle'

  // Region selection
  regions: Region[] = [];
  currentPage = 1;
  pageLimit = 10;
  typeSelection: Type[] = [undefined, Type.grass, Type.mountain, Type.mountainpeak, Type.sand, Type.snow, Type.water];
  searchName: string;
  searchType: Type;

  // Logs
  logs: Log[] = []
  logsCurrentPage = 1;
  logsPageLimit = 10;

  constructor (private characterService: CharacterService,
    private cityService: CityService,
    private logService: LogService,
    private route: ActivatedRoute,
    private router: Router,
    private regionService: RegionService) { }

  ngAfterViewInit () {
    this.rightCol.nativeElement.style.height = this.leftCol.nativeElement.offsetHeight + 'px';

    this.route.paramMap.subscribe(params => {
      this.characterService.getCharacterById(params.get('id')).subscribe(
        (c: Character) => {
          this.character = c

          if (this.character.cityId !== '-') {
            this.cityService.getCityById(this.character.regionId, this.character.cityId).subscribe(
              (ci: City) => {
                this.city = ci
                this.statusText = 'Idle'
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

          this.logsCurrentPage = 1
          this.logs = []
          this.loadNextLogPage()
        },
        err => {
          alert(err)
        }
      )
    })
  }

  loadNextRegionPage () {
    this.regionService.getRegionByParams(this.currentPage, this.pageLimit, this.searchName, this.searchType, true).subscribe(
      (data: Region[]) => {
        this.regions = this.regions.concat(data)
      },
      (err: Error) => {
        alert(err.message)
      }
    )
    this.currentPage++
  }

  loadNextLogPage () {
    this.logService.getAllLogs(this.character._id, this.logsCurrentPage, this.logsPageLimit).subscribe(
      (l: Log[]) => {
        this.logs = this.logs.concat(l)
      },
      (err: Error) => {
        alert(err.message)
      }
    )
    this.logsCurrentPage++
  }

  searchRegions () {
    this.currentPage = 1
    this.regions = []
    this.loadNextRegionPage()
  }

  moveToCity (cityId: string) {
    this.characterService.moveCharacterToCity(cityId, this.character._id).subscribe(
      (c) => {
        this.statusText = c.message
      },
      (err: Error) => {
        alert(err.message)
      }
    )
  }

  goToMap (id: String) {
    this.router.navigate(['/worldmap'], { queryParams: { id: id } })
  }
}
