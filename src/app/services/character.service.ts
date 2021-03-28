import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Character } from '../character/character';
import { AuthenticationService } from './authentication.service';
import { WINDOW } from './window.provider';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CharacterService {
  private token: string;
  private REST_API_SERVER = this.getURL();

  private getURL(): string {
    let port = '';
    if (!environment.production) {
      port = ':3000';
    }
    return this.window.location.protocol + '//' + this.window.location.hostname + port + '/api/';
  }

  constructor(private http: HttpClient,
              private router: Router,
              private auth: AuthenticationService,
              @Inject(WINDOW) private window: Window) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    this.token = localStorage.getItem('mean-token');
    return this.token;
  }

  private request(method: 'post'|'get'|'getById'|'getByCityId'|'put'|'delete'|'deleteById',
                  character?: Character, id?: string, cityid?: string): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.REST_API_SERVER + 'characters/',
      {name: character.name, gender: character.gender, regionId: character.regionId, cityId: character.cityId},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'get') {
      base = this.http.get(this.REST_API_SERVER + 'characters/', { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'getById') {
      base = this.http.get(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }  else if (method === 'getByCityId') {
      base = this.http.get(this.REST_API_SERVER + 'characters/', {
        params: {cityId: cityid},
        headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'put') {
      base = this.http.put(this.REST_API_SERVER + 'characters/' + id,
      {name: character.name, gender: character.gender, regionId: character.regionId},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'deleteById') {
      base = this.http.delete(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'delete') {
      base = this.http.delete(this.REST_API_SERVER + 'characters/', { headers: { Authorization: `Bearer ${this.getToken()}` }});
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

  public createCharacter(newCharacter: Character): Observable<any> {
    return this.request('post', newCharacter);
  }

  public getAllCharacters(): Observable<any> {
    return this.request('get');
  }

  public getCharacterById(id: string): Observable<any> {
    return this.request('getById', null, id);
  }

  public getAllCharactersByCityId(cityid: string): Observable<any> {
    return this.request('getByCityId', null, null, cityid);
  }

  public updateCharacter(newCharacter: Character, id: string): Observable<any> {
    return this.request('put', newCharacter, id);
  }

  public deleteCharacter(id: string): Observable<any> {
    return this.request('deleteById', null, id);
  }

  public deleteAllCharacters(): Observable<any> {
    return this.request('delete');
  }

}
