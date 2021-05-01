import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Character } from '../_models/character'
import { AuthenticationService } from './authentication.service'
import { WINDOW } from './window.provider'

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CharacterService {
  private REST_API_SERVER = this.getURL();

  private getURL (): string {
    let port = ''
    if (!environment.production) {
      port = ':3000'
    }
    return this.window.location.protocol + '//' + this.window.location.hostname + port + '/api/'
  }

  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService,
              @Inject(WINDOW) private window: Window) {}

  public createCharacter (character: Character): Observable<any> {
    return this.http.post(this.REST_API_SERVER + 'characters/',
      { name: character.name, gender: character.gender, regionId: character.regionId, cityId: character.cityId },
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public getAllCharacters (): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'characters/',
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public getCharacterById (id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public getAllCharactersByCityId (cityId: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'characters/', {
      params: { cityId },
      headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }
    })
  }

  public getAllCharactersByUserId (userId: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'characters/', {
      params: { userId },
      headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }
    })
  }

  public updateCharacter (character: Character, id: string): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'characters/' + id,
      { name: character.name, gender: character.gender, regionId: character.regionId },
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public deleteCharacter (id: string): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'characters/' + id, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public deleteAllCharacters (): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'characters/', { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }
}
