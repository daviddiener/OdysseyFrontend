import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region, Type } from '../_models/region';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent {
  regions: Region[] = [];
  currentPage = 1;
  pageLimit = 10;

  typeSelection: Type[] = [undefined, Type.grass, Type.mountain, Type.mountainpeak, Type.sand, Type.snow, Type.water];

  searchName: string;
  searchType: Type;

  constructor(private regionService: RegionService) {}

  loadNextPage() {
    this.regionService.getRegionByParams(this.currentPage, this.pageLimit, this.searchName, this.searchType).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data);
    });
    this.currentPage++;
  }

  searchRegions() {
    this.currentPage = 1;
    this.regions = [];
    this.loadNextPage();
  }
}
