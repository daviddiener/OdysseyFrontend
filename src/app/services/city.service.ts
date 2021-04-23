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

  public getAllCities(parentId: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/',
    { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }

  public getCityById(parentId: string, id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/' + id,
    { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }
}
