import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegionService } from '../services/region.service';
import { Region } from '../region/region';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'app-region',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.css']
})
export class RegionDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  region: Region;
  showOutlet = false;

  constructor(private regionService: RegionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.regionService.getRegionById(params.get('id')).subscribe((c: Region) => {
          this.region = c;
      });
    });
  }

  onActivate() {
    this.showOutlet = true;
  }

  onDeactivate() {
    this.showOutlet = false;
  }

}
