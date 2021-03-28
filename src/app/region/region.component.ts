import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region } from './region';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];
  newRegion = new Region();
  currentPage = 1;
  pageLimit = 10;

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.currentPage = 1;
    this.regionService.getPartRegions(this.currentPage, this.pageLimit).subscribe((data: Region[]) => {
      this.regions = data;
    });
    this.currentPage++;
  }

  loadNextPage() {
    this.regionService.getPartRegions(this.currentPage, this.pageLimit).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data);
    });
    this.currentPage++;
  }

  createRegion() {
    this.regionService.createRegion(this.newRegion).subscribe(() => {
      if (this.regions.length < this.pageLimit){
        this.ngOnInit();
      }
    });
  }

  deleteAllRegions() {
    if (confirm('Are you sure to delete all regions?')) {
      this.regionService.deleteAllRegions().subscribe(() => {
        if (this.regions.length < this.pageLimit){
          this.ngOnInit();
        }
      });
    }
  }
}
