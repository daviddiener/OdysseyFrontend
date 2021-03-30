import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Character } from '../_models/character';
import { AuthenticationService } from './authentication.service';
import { WINDOW } from './window.provider';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CharacterService {
  private REST_API_SERVER = this.getURL();

  private getURL(): string {
    let port = '';
    if (!environment.production) {
      port = ':3000';
    }
    return this.window.location.protocol + '//' + this.window.location.hostname + port + '/api/';
  }

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              @Inject(WINDOW) private window: Window) {}

  private request(method: 'post'|'get'|'getById'|'getByCityId'|'put'|'delete'|'deleteById',
                  character?: Character, id?: string, cityid?: string): Observable<any> {
    let request;

    if (method === 'post') {
      request = this.http.post(this.REST_API_SERVER + 'characters/',
      {name: character.name, gender: character.gender, regionId: character.regionId, cityId: character.cityId},
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'get') {
      request = this.http.get(this.REST_API_SERVER + 'characters/', { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'getById') {
      request = this.http.get(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    }  else if (method === 'getByCityId') {
      request = this.http.get(this.REST_API_SERVER + 'characters/', {
        params: {cityId: cityid},
        headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'put') {
      request = this.http.put(this.REST_API_SERVER + 'characters/' + id,
      {name: character.name, gender: character.gender, regionId: character.regionId},
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'deleteById') {
      request = this.http.delete(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'delete') {
      request = this.http.delete(this.REST_API_SERVER + 'characters/', { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    }

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
