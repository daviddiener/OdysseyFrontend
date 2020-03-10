import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class CityService {
  private token: string;
  private REST_API_SERVER = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

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

  private request(method: 'get'|'getById', parentId: string, id?: string): Observable<any> {
    let base;

    if (method === 'get') {
      base = this.http.get(this.REST_API_SERVER + 'games/' + parentId + '/cities/',
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'getById') {
      base = this.http.get(this.REST_API_SERVER + 'games/' + parentId + '/cities/' + id,
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
