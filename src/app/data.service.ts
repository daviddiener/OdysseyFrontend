import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Game } from './game/game';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getAllGames() {
    return this.httpClient.get(this.REST_API_SERVER + '/games').pipe(catchError(this.handleError));
  }

  public getGame(id: string) {
    return this.httpClient.get(this.REST_API_SERVER + '/games' + id).pipe(catchError(this.handleError));
  }

  public createGame(newGame: Game) {
    return this.httpClient.post(this.REST_API_SERVER + '/games',
      {title: newGame.title, seed: newGame.seed, mapsize: newGame.mapsize}).pipe(catchError(this.handleError));
  }

  public deleteGame(id: string) {
    return this.httpClient.delete(this.REST_API_SERVER + '/games' + id).pipe(catchError(this.handleError));
  }

}
