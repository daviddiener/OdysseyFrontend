import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Region } from '../region/region';
import { AuthenticationService } from './authentication.service';
import { WINDOW } from './window.provider';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class RegionService {
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
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'getById'|'put'|'delete', region?: Region, id?: string): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.REST_API_SERVER + 'regions/',
      {title: region.title, seed: region.seed, mapsize: region.mapsize},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'get') {
      base = this.http.get(this.REST_API_SERVER + 'regions/', { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'getById') {
      base = this.http.get(this.REST_API_SERVER + 'regions/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'put') {
      base = this.http.put(this.REST_API_SERVER + 'regions/' + id, {title: region.title, seed: region.seed, mapsize: region.mapsize},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'delete') {
      base = this.http.delete(this.REST_API_SERVER + 'regions/' + id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
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

  public createRegion(newRegion: Region): Observable<any> {
    return this.request('post', newRegion);
  }

  public getAllRegions(): Observable<any> {
    return this.request('get');
  }

  public getRegionById(id: string): Observable<any> {
    return this.request('getById', null, id);
  }

  public updateRegion(newRegion: Region, id: string): Observable<any> {
    return this.request('put', newRegion, id);
  }

  public deleteRegion(id: string): Observable<any> {
    return this.request('delete', null, id);
  }

}
