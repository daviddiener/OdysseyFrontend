import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region } from './region';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  faTrash = faTrash;
  regions: Region[] = [];
  newRegion = new Region();
  currentPage = 1;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private regionService: RegionService) { }

  ngOnInit() {
    this.regionService.getPartRegions(this.currentPage).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data);
    });
    this.currentPage++;
  }

  loadNextPage() {
    this.regionService.getPartRegions(this.currentPage).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data);
    });
    this.currentPage++;
  }

  createRegion() {
    this.regionService.createRegion(this.newRegion).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteRegion(id: any) {
    this.regionService.deleteRegion(id).subscribe(() => {
      this.ngOnInit();
    });
  }

}
