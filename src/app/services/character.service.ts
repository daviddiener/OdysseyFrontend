import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Character } from '../_models/character'
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private REST_API_SERVER = environment.apiEndpoint

  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService
              ) {}

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

  public updateCharacter (character: Character, characterId: string): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'characters/' + characterId,
      { name: character.name, gender: character.gender, regionId: character.regionId },
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public moveCharacterToCity (city: String, characterId: string): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'characters/' + characterId,
      { cityId: city },
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public deleteCharacter (characterId: string): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'characters/' + characterId, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public deleteAllCharacters (): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'characters/', { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }
}
