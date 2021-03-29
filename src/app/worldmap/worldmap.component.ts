import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { RegionLite } from '../region/region_lite';
import Phaser, { Cameras } from 'phaser';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  msc: MainScene;

  constructor(private regionService: RegionService) {
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
    this.msc = new MainScene(this.regionService);
    this.config.scene = this.msc;
    this.phaserGame = new Phaser.Game(this.config);
  }
}

class MainScene extends Phaser.Scene {
  tileSize = 32;
  cam: Cameras.Scene2D.Camera;
  cameraCursor: Phaser.GameObjects.Arc;

  constructor(private regionService: RegionService) {
    super({ key: 'main' });
  }

  preload() {
    this.load.spritesheet('worldTiles', 'assets/tiles/world_spritesheet.png', { frameWidth: 32, frameHeight: 32, endFrame: 3 });
  }

  create() {
    this.FetchRegions(0, 0);

    this.cam = this.cameras.main;
    this.cam.setZoom(2);
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

  FetchRegions(x: number, y: number){
    this.regionService.getRegionChunk(x, y, 10).subscribe((data: RegionLite[]) => {
      data.forEach(element => {
        if (element.noise < 0.4){
          this.add.sprite(element.x * this.tileSize, element.y * this.tileSize, 'worldTiles', 2)
          .depth = 10;
        } else if (element.noise < 0.6) {
          this.add.sprite(element.x * this.tileSize, element.y * this.tileSize, 'worldTiles', 1)
          .depth = 10;
        }
        else {
          this.add.sprite(element.x * this.tileSize, element.y * this.tileSize, 'worldTiles', 3)
          .depth = 10;
        }
      });
    });
  }
}
