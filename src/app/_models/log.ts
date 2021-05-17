/* eslint no-unused-vars: 0 */

export enum Action {
    arrivedInCity = 'arrivedInCity',
    arrivedInRegion = 'arrivedInRegion',
    killed = 'killed',
    bought = 'bought'
  }

export class Log {
    // tslint:disable-next-line:variable-name
    _id?: string;
    subjectId: string;
    action: Action;
    objectId: string;
    cityId: string;
    date: Date;
}
