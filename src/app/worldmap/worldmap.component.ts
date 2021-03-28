import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { RegionLite } from '../region/region_lite';
import Phaser, { Cameras } from 'phaser';
import { Chunk } from './Chunk';

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
  regions: RegionLite[] = [];
  tileSize = 32;
  chunkSize = 8;
  cam: Cameras.Scene2D.Camera;
  cameraCursor: Phaser.GameObjects.Arc;
  loadedChunks: Chunk[] = [];

  constructor(private regionService: RegionService) {
    super({ key: 'main' });
  }

  preload() {
    this.load.spritesheet('worldTiles', 'assets/tiles/world_spritesheet.png', { frameWidth: 32, frameHeight: 32, endFrame: 3 });
  }

  create() {
    this.FetchChunk(0, 0);
    this.FetchChunk(-1, 0);
    this.FetchChunk(1, 0);
    this.FetchChunk(0, 1);
    this.FetchChunk(-1, 1);
    this.FetchChunk(1, 1);
    this.FetchChunk(0, -1);
    this.FetchChunk(-1, -1);
    this.FetchChunk(1, -1);

    this.loadedChunks.push(new Chunk(0, 0, true));
    this.loadedChunks.push(new Chunk(-1, 0, true));
    this.loadedChunks.push(new Chunk(1, 0, true));
    this.loadedChunks.push(new Chunk(0, 1, true));
    this.loadedChunks.push(new Chunk(-1, 1, true));
    this.loadedChunks.push(new Chunk(1, 1, true));
    this.loadedChunks.push(new Chunk(0, -1, true));
    this.loadedChunks.push(new Chunk(-1, -1, true));
    this.loadedChunks.push(new Chunk(1, -1, true));

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

    this.cameraCursor = this.add.circle((this.cam.scrollX + this.cam.width / 2), (this.cam.scrollY + this.cam.height / 2), 4, 0xff0000);
    this.cameraCursor.depth = 10;
  }

  update() {
    this.cameraCursor.x = this.cam.scrollX + this.cam.width / 2;
    this.cameraCursor.y = this.cam.scrollY + this.cam.height / 2;

    // if (this.loadedChunks.find(c => c.x === Math.floor((this.cam.scrollX + this.cam.width / 2) / (this.tileSize * this.chunkSize)) &&
    // c.y === Math.floor((this.cam.scrollY + this.cam.height / 2) / (this.tileSize * this.chunkSize)) &&
    // c.loaded === true) == null) {
    //     this.FetchChunk(Math.floor((this.cam.scrollX + this.cam.width / 2) / (this.tileSize * this.chunkSize)),
    //                     Math.floor((this.cam.scrollY + this.cam.height / 2) / (this.tileSize * this.chunkSize)));
    //     this.loadedChunks.push(new Chunk(Math.floor((this.cam.scrollX + this.cam.width / 2) / (this.tileSize * this.chunkSize)),
    //     Math.floor((this.cam.scrollY + this.cam.height / 2) / (this.tileSize * this.chunkSize)),
    //     true));
    // }
  }

  FetchChunk(x: number, y: number){
    this.regionService.getRegionChunk(x * this.chunkSize + (this.chunkSize / 2),
                                      y * this.chunkSize + (this.chunkSize / 2),
                                      (this.chunkSize / 2) + 1).subscribe((data: RegionLite[]) => {
      this.regions = this.regions.concat(data);
      this.DrawRegions();
    });

    // Mark the middle of the chunk
    const tmp = this.add.circle(
      (x * this.chunkSize + (this.chunkSize / 2)) * this.tileSize,
      (y * this.chunkSize + (this.chunkSize / 2)) * this.tileSize,
      4, 0x00ff00);
    tmp.depth = 10;
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
