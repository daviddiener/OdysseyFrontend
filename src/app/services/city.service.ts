import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class CityService {
  private REST_API_SERVER = environment.apiEndpoint
  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  public getAllCities (parentId: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/',
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public getCityById (parentId: string, id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/' + id,
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }
}
