import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Game } from '../game/game';
import { AuthenticationService } from './authentication.service';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private token: string;
  private REST_API_SERVER = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'getById'|'put'|'delete', game?: Game, id?: string): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.REST_API_SERVER + 'games/',
      {title: game.title, seed: game.seed, mapsize: game.mapsize, players: [this.auth.getUserDetails().email]},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'get') {
      base = this.http.get(this.REST_API_SERVER + 'games/', { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'getById') {
      base = this.http.get(this.REST_API_SERVER + 'games/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'put') {
      base = this.http.put(this.REST_API_SERVER + 'games/' + id, {title: game.title, seed: game.seed, mapsize: game.mapsize},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'delete') {
      base = this.http.delete(this.REST_API_SERVER + 'games/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public createGame(newGame: Game): Observable<any> {
    return this.request('post', newGame);
  }

  public getAllGames(): Observable<any> {
    return this.request('get');
  }

  public getGameById(id: string): Observable<any> {
    return this.request('getById', null, id);
  }

  public updateGame(newGame: Game, id: string): Observable<any> {
    return this.request('put', newGame, id);
  }

  public deleteGame(id: string): Observable<any> {
    return this.request('delete', null, id);
  }

}
