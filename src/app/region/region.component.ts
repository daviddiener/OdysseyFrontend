import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { ActivatedRoute } from '@angular/router';
import { Region } from './region';


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  regions: Region[] = [];

  constructor(private regionService: RegionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => {
      this.regionService.getAllRegions(params.get('id')).subscribe((data: Region[]) => {
          this.regions = data;
      });
    });
  }

}
