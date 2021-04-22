import { Component, OnInit} from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region, Type } from '../_models/region';
import Phaser, { Cameras } from 'phaser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  hud: HUD;

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
      this.hud = new HUD(this.msc);
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

class MainScene extends Phaser.Scene {
  sprites: Phaser.GameObjects.Sprite[] = [];
  markerBox: Phaser.GameObjects.Rectangle;
  infoBox: Phaser.GameObjects.Text;
  infoButton: Phaser.GameObjects.Text;
  infoBackground: Phaser.GameObjects.Rectangle;
  tileSize = 32;
  cam: Cameras.Scene2D.Camera;
  cameraCursor: Phaser.GameObjects.Arc;
  pointerDownCoordinates: Phaser.Math.Vector2;
  startId: string;
  startRange: number;
  currentRegion: Region;

  constructor(private regionService: RegionService, private router: Router, startId: string, startRange: number) {
    super({ key: 'main' });
    this.startId = startId;
    this.startRange = startRange;
  }

  preload() {
    this.load.spritesheet('worldTiles', 'assets/tiles/world_spritesheet.png', { frameWidth: 32, frameHeight: 32, endFrame: 5 });
  }

  create() {
    this.cam = this.cameras.main;
    this.cam.setZoom(1);
    this.input.on('pointermove', (p: any) => {
      if (!p.isDown){
        return;
      }
      this.cam.scrollX -= (p.x - p.prevPosition.x) / this.cam.zoom;
      this.cam.scrollY -= (p.y - p.prevPosition.y) / this.cam.zoom;
    });

    if (this.startId) {
      this.regionService.getRegionById(this.startId).subscribe((region: Region) => {
        this.FetchRegions(region.x, region.y, this.startRange, true);
        this.currentRegion = region;
      });
    } else{
      this.FetchRegions(0, 0 , this.startRange, true);
    }
  }

  FetchRegions(x: number, y: number, range: number, centerCamera: boolean){
    if (centerCamera){
      this.cam.scrollX = x * this.tileSize  - this.cam.width / 2;
      this.cam.scrollY = y * this.tileSize - this.cam.height / 2;
    }

    this.regionService.streamRegionChunk(x, y, range).node('{_id type x y}',
    (element: Region) => {
        let tileType: number;
        if (element.type === Type.water){
          tileType = 0;
        } else if (element.type === Type.sand) {
          tileType = 1;
        } else if (element.type === Type.grass) {
          tileType = 2;
        } else if (element.type === Type.snow) {
          tileType = 3;
        } else if (element.type === Type.mountain) {
          tileType = 4;
        } else if (element.type === Type.mountainpeak) {
          tileType = 5;
        }
        const tmpSprite: Phaser.GameObjects.Sprite = this.add.sprite(element.x * this.tileSize,
                                                                    element.y * this.tileSize,
                                                                    'worldTiles',
                                                                    tileType);
        tmpSprite.setInteractive();
        tmpSprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          this.pointerDownCoordinates = new Phaser.Math.Vector2(pointer.x, pointer.y);
        });
        tmpSprite.on('pointerup', (pointer) => {
          if (this.pointerDownCoordinates.equals(new Phaser.Math.Vector2(pointer.x, pointer.y))){
            this.DrawInfoBox(element, range);
            this.DrawMarkerBox(element.x * this.tileSize, element.y * this.tileSize);
          }
        });

        if (this.sys.game.device.os.desktop){
          tmpSprite.on('pointerover', (pointer) => {
            tmpSprite.setTint(0xff0000);
          });
          tmpSprite.on('pointerout', (pointer) => {
            tmpSprite.clearTint();
          });
        }
        this.sprites.push(tmpSprite);
    });

    this.DrawMarkerBox(x * this.tileSize, y * this.tileSize);
    this.sprites.forEach(element => {
      element.destroy();
    });
  }

  DrawInfoBox(region: Region, fetchRange: number){
    if (this.infoBox && this.infoButton && this.infoBackground) {
      this.infoBox.destroy();
      this.infoButton.destroy();
      this.infoBackground.destroy();
    }
    this.infoBox = this.add.text(
      region.x * this.tileSize,
      region.y * this.tileSize,
      'Loading...',
      { font: '16px monospace' });
    this.infoBox.depth = 11;

    this.regionService.getRegionById(region._id).subscribe((data: Region) => {
      this.infoBox.setText(
        [
          'Name: ' + data.name,
          'Type: ' + data.type,
          'X: ' + data.x.toString(),
          'Y: ' + data.y.toString(),
      ]);
      this.infoBox.setInteractive();
      this.infoBox.on('pointerup', (pointer) => {
        this.router.navigate(['/regions', region._id]);
      });

      this.infoButton = this.add.text(
        this.infoBox.getBottomLeft().x,
        this.infoBox.getBottomLeft().y,
        'Expand Map around ' + data.name);
      this.infoButton.setStyle(
        {
          font: '16px monospace',
          backgroundColor: '#3a3a99',
          fixedWidth: this.infoButton.getBottomRight().x - this.infoButton.getTopLeft().x,
          fixedHeight: this.infoButton.getBottomRight().y - this.infoButton.getTopLeft().y
        }
      );
      this.infoButton.depth = 11;
      this.infoButton.setInteractive();
      this.infoButton.on('pointerup', (pointer) => {
        this.FetchRegions(region.x, region.y, fetchRange, true);
        this.currentRegion = region;
      });


      let bottomX: number;
      if (this.infoBox.getTopRight().x > this.infoButton.getBottomRight().x) {
        bottomX = this.infoBox.getTopRight().x - this.infoBox.getTopLeft().x;
      } else {
        bottomX = this.infoButton.getBottomRight().x - this.infoBox.getTopLeft().x;
      }

      this.infoBackground = this.add.rectangle(
        this.infoBox.getTopLeft().x,
        this.infoBox.getTopLeft().y,
        bottomX,
        this.infoButton.getBottomRight().y - this.infoBox.getTopLeft().y,
        0x364038,
        50
      );
      this.infoBackground.depth = 10;
      this.infoBackground.setOrigin(0);
    });
  }

  DrawMarkerBox(x: number, y: number){
    if (this.markerBox !== undefined) {
      this.markerBox.destroy();
    }

    this.markerBox = this.add.rectangle(x, y, this.tileSize, this.tileSize, 0xff0000);
    this.markerBox.depth = 9;
  }
}

class HUD extends Phaser.Scene {
  msc: MainScene;
  zoomLevel = 2;
  zoomSteps: number[] = [0.2, 0.5, 1, 2, 3];

  constructor(mainScene: MainScene)
  {
      super({ key: 'UIScene', active: true });
      this.msc = mainScene;
  }

  create()
  {
      const zoomButton1 = this.add.text(10, 10, 'Zoom in',
      { font: '16px Arial', color: '#FFFFFF', backgroundColor: '#000000'});
      zoomButton1.setInteractive();
      zoomButton1.on('pointerup', () => {
        this.zoomCamera(true);
      });

      const zoomButton2 = this.add.text(zoomButton1.getTopRight().x + 10, zoomButton1.getTopRight().y, 'Zoom out',
      { font: '16px Arial', color: '#FFFFFF', backgroundColor: '#000000' });
      zoomButton2.setInteractive();
      zoomButton2.on('pointerup', () => {
        this.zoomCamera(false);
      });
  }

  zoomCamera(increase: boolean) {
    if (increase) {
      this.zoomLevel++;
    } else {
      this.zoomLevel--;
    }
    this.zoomLevel = Math.max(0, Math.min(this.zoomLevel, this.zoomSteps.length - 1));
    this.msc.cam.zoom = this.zoomSteps[this.zoomLevel];
  }
}
