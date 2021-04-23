import Phaser from 'phaser';
import MainScene from './mainscene';

export default class HudScene extends Phaser.Scene {
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
