import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region } from '../region/region';
import Phaser from 'phaser';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {
  regions: Region[] = [];
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  msc: MainScene = null;

  constructor(private regionService: RegionService) {
    this.config = {
      type: Phaser.AUTO,
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
    this.regionService.getRegionChunk(0, 0, 10).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data);
      this.msc =  new MainScene(this.regions);
      this.config.scene = this.msc;
      this.phaserGame = new Phaser.Game(this.config);
    });
  }
}

class MainScene extends Phaser.Scene {
  regions: Region[] = [];
  tileSize = 64;
  cam: any;

  constructor(regions: Region[]) {
    super({ key: 'main' });
    this.regions = regions;
  }

  preload() {
    this.load.spritesheet('worldTiles', 'assets/tiles/world_spritesheet.png', { frameWidth: 32, frameHeight: 32, endFrame: 3 });
  }

  create() {
    this.DrawRegions();

    this.cam = this.cameras.main;
    // this.cam.setBounds(0, 0, map.displayWidth, map.displayHeight);
    this.cam.setZoom(1);
    this.cam.scrollX = 0 - this.cam.width / 2;
    this.cam.scrollY = 0 - this.cam.height / 2;
    this.input.on('pointermove', (p: any) => {
      if (!p.isDown){
        return;
      }

      this.cam.scrollX -= (p.x - p.prevPosition.x) / this.cam.zoom;
      this.cam.scrollY -= (p.y - p.prevPosition.y) / this.cam.zoom;
    });
  }

  DrawRegions(){
    this.regions.forEach(element => {
      if (element.noise < 0.4){
        this.add.tileSprite(element.x * this.tileSize, element.y * this.tileSize, this.tileSize, this.tileSize, 'worldTiles', 2);
      } else if (element.noise < 0.6) {
        this.add.tileSprite(element.x * this.tileSize, element.y * this.tileSize, this.tileSize, this.tileSize, 'worldTiles', 1);
      }
      else {
        this.add.tileSprite(element.x * this.tileSize, element.y * this.tileSize, this.tileSize, this.tileSize, 'worldTiles', 3);
      }
    });
  }
}
