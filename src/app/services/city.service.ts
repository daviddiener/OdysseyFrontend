import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class CityService {
  private REST_API_SERVER = environment.apiEndpoint
  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  headers = new HttpHeaders()
  .set('Authorization', `Bearer ${this.authenticationService.getToken()}`); 

  public getAllCities (parentId: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/',
    { headers: this.headers })
  }

  public getCityById (parentId: string, id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/' + id,
    { headers: this.headers })
  }
}
