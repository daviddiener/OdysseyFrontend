import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { WINDOW } from './window.provider';

@Injectable({
  providedIn: 'root'
})

export class CityService {
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

  private request(method: 'get'|'getById', parentId: string, id?: string): Observable<any> {
    let request;

    if (method === 'get') {
      request = this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/',
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'getById') {
      request = this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/' + id,
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    }

    return request;
  }

  public getAllCities(parentId: string): Observable<any> {
    return this.request('get', parentId);
  }

  public getCityById(parentId: string, id: string): Observable<any> {
    return this.request('getById', parentId, id);
  }
}
