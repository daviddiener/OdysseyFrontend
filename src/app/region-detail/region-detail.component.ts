import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RegionService } from '../services/region.service'
import { Region } from '../_models/region'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'

@Component({
  selector: 'app-region',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.css']
})
export class RegionDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  region: Region;
  showOutlet = false;

  constructor (private regionService: RegionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit () {
    this.route.paramMap.subscribe(params => {
      this.regionService.getRegionById(params.get('id')).subscribe((c: Region) => {
        this.region = c
      },
      (err: Error) => {
        alert(err.message)
      })
    })
  }

  onActivate () {
    this.showOutlet = true
  }

  onDeactivate () {
    this.showOutlet = false
  }

  goToMap () {
    this.router.navigate(['/worldmap'], { queryParams: { id: this.region._id } })
  }
}
