export class Chunk {
    x: number;
    y: number;
    loaded: boolean;

    constructor(x: number, y: number, loaded: boolean){
      this.x = x;
      this.y = y;
      this.loaded = loaded;
    }
  }
