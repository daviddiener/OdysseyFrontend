import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { City } from './city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: City[] = [];

  constructor(private cityService: CityService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => {
      this.cityService.getAllCities(params.get('id')).subscribe((data: City[]) => {
          this.cities = data;
      });
    });
  }

}
