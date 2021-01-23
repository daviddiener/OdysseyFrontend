import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Character } from '../character/character';
import { AuthenticationService } from './authentication.service';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  private token: string;
  private REST_API_SERVER = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    this.token = localStorage.getItem('mean-token');
    return this.token;
  }

  private request(method: 'post'|'get'|'getById'|'put'|'delete', character?: Character, id?: string): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.REST_API_SERVER + 'characters/',
      {name: character.name, gender: character.gender, regionId: character.regionId, cityId: character.cityId},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'get') {
      base = this.http.get(this.REST_API_SERVER + 'characters/', { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'getById') {
      base = this.http.get(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'put') {
      base = this.http.put(this.REST_API_SERVER + 'characters/' + id,
      {name: character.name, gender: character.gender, regionId: character.regionId},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'delete') {
      base = this.http.delete(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
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

  public updateCharacter(newCharacter: Character, id: string): Observable<any> {
    return this.request('put', newCharacter, id);
  }

  public deleteCharacter(id: string): Observable<any> {
    return this.request('delete', null, id);
  }

}
