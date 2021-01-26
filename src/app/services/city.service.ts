import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { WINDOW } from './window.provider';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class CityService {
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
              @Inject(WINDOW) private window: Window) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    this.token = localStorage.getItem('mean-token');
    return this.token;
  }

  private request(method: 'get'|'getById', parentId: string, id?: string): Observable<any> {
    let base;

    if (method === 'get') {
      base = this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/',
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'getById') {
      base = this.http.get(this.REST_API_SERVER + 'regions/' + parentId + '/cities/' + id,
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
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

  public getAllCities(parentId: string): Observable<any> {
    return this.request('get', parentId);
  }

  public getCityById(parentId: string, id: string): Observable<any> {
    return this.request('getById', parentId, id);
  }
}
