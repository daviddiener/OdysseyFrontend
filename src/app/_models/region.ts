export enum Type {
  water = 'water',
  sand = 'sand',
  grass = 'grass',
  snow = 'snow',
  mountain = 'mountain',
  mountainpeak = 'mountainpeak'
}

export class Region {
    // tslint:disable-next-line:variable-name
    _id?: string;
    name: string;
    seed: number;
    x: number;
    y: number;
    noise: number;
    type: Type;
    createdDate: Date;
  }
