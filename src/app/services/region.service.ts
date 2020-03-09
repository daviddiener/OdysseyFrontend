import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Region } from '../region/region';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class RegionService {
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

  private request(method: 'post'|'get'|'getById'|'put'|'delete', parentId: string, id?: string, region?: Region): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.REST_API_SERVER + 'games/' + parentId + 'regions/',
      {name: region.name, description: region.description, gameId: region.gameId, type: region.type, owner: region.owner},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'get') {
      base = this.http.get(this.REST_API_SERVER + 'games/' + parentId + '/regions/',
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'getById') {
      base = this.http.get(this.REST_API_SERVER + 'games/' + parentId + 'regions/' + id,
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'put') {
      base = this.http.put(this.REST_API_SERVER + 'games/' + parentId + 'regions/' + id,
      {name: region.name, description: region.description, gameId: region.gameId, type: region.type, owner: region.owner},
      { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if (method === 'delete') {
      base = this.http.delete(this.REST_API_SERVER + 'games/' + parentId + 'regions/' + id,
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

  public createRegion(parentId: string, region: Region): Observable<any> {
    return this.request('post', parentId, null, region);
  }

  public getAllRegions(parentId: string): Observable<any> {
    return this.request('get', parentId);
  }

  public getRegionById(parentId: string, id: string): Observable<any> {
    return this.request('getById', parentId, id);
  }

  public updateRegion(parentId: string, region: Region, id: string): Observable<any> {
    return this.request('put', parentId, id, region);
  }

  public deleteRegion(parentId: string, id: string): Observable<any> {
    return this.request('delete', parentId, id);
  }
}
