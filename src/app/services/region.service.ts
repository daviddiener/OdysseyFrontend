import { Injectable, Inject } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Region } from '../_models/region';
import { AuthenticationService } from './authentication.service';
import { WINDOW } from './window.provider';

@Injectable({
  providedIn: 'root'
})

export class RegionService {
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

  private request(method: 'post'|'get'|'getById'|'put'|'delete'|'deleteById', region?: Region, id?: string,
                  pageNum?: number, pageLimit?: number, x?: number, y?: number, range?: number): Observable<any> {
    let request;
    let paginatorParams = new HttpParams();

    if (pageNum != null && pageLimit != null) {
      paginatorParams = paginatorParams.append('pageNum', pageNum.toString());
      paginatorParams = paginatorParams.append('pageLimit', pageLimit.toString());
    } else if (x != null && y != null && range != null){
      paginatorParams = paginatorParams.append('x', x.toString());
      paginatorParams = paginatorParams.append('y', y.toString());
      paginatorParams = paginatorParams.append('range', range.toString());
    }

    if (method === 'post') {
      request = this.http.post(this.REST_API_SERVER + 'regions/', {}, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'get') {
      request = this.http.get(this.REST_API_SERVER + 'regions/', {
        params: paginatorParams,
        headers: { Authorization: `Bearer ${this.authenticationService.getToken()}`
      }});
    } else if (method === 'getById') {
      request = this.http.get(this.REST_API_SERVER + 'regions/' + id, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'put') {
      request = this.http.put(this.REST_API_SERVER + 'regions/' + id, {}, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'deleteById') {
      request = this.http.delete(this.REST_API_SERVER + 'regions/' + id, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'delete') {
      request = this.http.delete(this.REST_API_SERVER + 'regions/', { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    }

    return request;
  }

  public createRegion(): Observable<any> {
    return this.request('post');
  }

  public getAllRegions(): Observable<any> {
    return this.request('get');
  }

  public getPartRegions(pageNum: number, pageLimit: number): Observable<any> {
    return this.request('get', null, null, pageNum, pageLimit);
  }

  public getRegionChunk(x: number, y: number, range: number): Observable<any> {
    return this.request('get', null, null, null, null, x, y, range);
  }

  public getRegionById(id: string): Observable<any> {
    return this.request('getById', null, id);
  }

  public updateRegion(newRegion: Region, id: string): Observable<any> {
    return this.request('put', newRegion, id);
  }

  public deleteRegion(id: string): Observable<any> {
    return this.request('deleteById', null, id);
  }

  public deleteAllRegions(): Observable<any> {
    return this.request('delete');
  }

}
