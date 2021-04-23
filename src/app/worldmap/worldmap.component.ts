import { Component, OnInit} from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region } from '../_models/region';
import Phaser from 'phaser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import MainScene from './worldmap_phaser/mainscene';
import HudScene from './worldmap_phaser/hudscene';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {
  selectedRegion: Region;
  regionId: number = null;
  range = new FormControl(15, [Validators.max(100), Validators.min(5)]);

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  msc: MainScene;
  hud: HudScene;

  constructor(private regionService: RegionService, private route: ActivatedRoute, private router: Router) {
    this.config = {
      type: Phaser.AUTO,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 }
        }
      },
      scale: {
        parent: 'gameContainer',
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    }
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.msc = new MainScene(this.regionService, this.router, data.id, this.range.value);
      this.hud = new HudScene(this.msc);
      this.config.scene = [this.msc, this.hud];
      this.phaserGame = new Phaser.Game(this.config);
    });
  }

  goToRegionRangeTrigger(){
    if (!this.range.invalid) {
      if (this.msc.currentRegion){
        this.msc.FetchRegions(this.msc.currentRegion.x, this.msc.currentRegion.y, this.range.value, false);
      } else {
        this.msc.FetchRegions(0, 0, this.range.value, false);
      }
    }
  }
}
