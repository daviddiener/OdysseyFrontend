import { Component, OnInit} from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region, Type } from '../_models/region';
import Phaser, { Cameras } from 'phaser';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {
  regions: Region[] = [];
  selectedRegion: Region;
  regionId: number = null;
  currentPage = 1;
  pageLimit = 10;
  range = new FormControl(15, [Validators.max(30), Validators.min(5)]);

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
    this.regionService.getPartRegions(this.currentPage, this.pageLimit).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data);
    });
    this.currentPage++;

    this.msc = new MainScene(this.regionService);
    this.config.scene = this.msc;
    this.phaserGame = new Phaser.Game(this.config);
  }

  loadNextPage() {
    this.regionService.getPartRegions(this.currentPage, this.pageLimit).subscribe((data: Region[]) => {
      this.regions = this.regions.concat(data);
    });
    this.currentPage++;
  }

  goToRegion(region: Region){
    this.selectedRegion = region;
    this.msc.FetchRegions(region.x, region.y, this.range.value, true);
  }

  goToRegionRangeTrigger(){
    if (this.selectedRegion){
      this.msc.FetchRegions(this.selectedRegion.x, this.selectedRegion.y, this.range.value, false);
    }
  }
}

class MainScene extends Phaser.Scene {
  sprites: Phaser.GameObjects.Sprite[] = [];
  markerBox: Phaser.GameObjects.Rectangle;
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
    this.cam = this.cameras.main;
    this.cam.setZoom(2);
    // this.cam.scrollX = 0 - this.cam.width / 2;
    // this.cam.scrollY = 0 - this.cam.height / 2;
    this.input.on('pointermove', (p: any) => {
      if (!p.isDown){
        return;
      }
      this.cam.scrollX -= (p.x - p.prevPosition.x) / this.cam.zoom;
      this.cam.scrollY -= (p.y - p.prevPosition.y) / this.cam.zoom;
    });
  }

  FetchRegions(x: number, y: number, range: number, centerCamera: boolean){
    if (centerCamera){
      this.cam.scrollX = x * this.tileSize  - this.cam.width / 2;
      this.cam.scrollY = y * this.tileSize - this.cam.height / 2;
    }

    this.regionService.getRegionChunk(x, y, range).subscribe((data: Region[]) => {
      this.sprites.forEach(element => {
        element.destroy();
      });

      if (this.markerBox !== undefined) {
        this.markerBox.destroy();
      }

      this.markerBox = this.add.rectangle(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, 0xff0000);
      this.markerBox.depth = 10;

      data.forEach(element => {
        if (element.type === Type.water){
          this.sprites.push(this.add.sprite(element.x * this.tileSize, element.y * this.tileSize, 'worldTiles', 2));
        } else if (element.type === Type.sand) {
          this.sprites.push(this.add.sprite(element.x * this.tileSize, element.y * this.tileSize, 'worldTiles', 1));
        } else if (element.type === Type.grass || element.type === Type.snow) {
          this.sprites.push(this.add.sprite(element.x * this.tileSize, element.y * this.tileSize, 'worldTiles', 0));
        } else {
          this.sprites.push(this.add.sprite(element.x * this.tileSize, element.y * this.tileSize, 'worldTiles', 3));
        }
      });
    });
  }
}
