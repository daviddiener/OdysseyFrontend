import { Injectable } from '@angular/core'
import { HttpParams, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Region, Type } from '../_models/region'
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class RegionService {
  private REST_API_SERVER = environment.apiEndpoint
  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  public createRegion (): Observable<any> {
    return this.http.post(this.REST_API_SERVER + 'regions/', {}, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public getAllRegions (): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/',
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public getPartRegions (pageNum: number, pageLimit: number): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/', {
      params: new HttpParams()
        .append('pageNum', pageNum.toString())
        .append('pageLimit', pageLimit.toString()),
      headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }
    })
  }

  public getRegionChunk (x: number, y: number, range: number): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/', {
      params: new HttpParams()
        .append('x', x.toString())
        .append('y', y.toString())
        .append('range', range.toString()),
      headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }
    })
  }

  public getRegionByParams (pageNum: number, pageLimit: number, regionName?: string, regionType?: Type, enableCities?: boolean): Observable<any> {
    let params = new HttpParams()
      .append('pageNum', pageNum.toString())
      .append('pageLimit', pageLimit.toString())

    if (regionName) {
      params = params.append('regionName', regionName.toString())
    }
    if (regionType) {
      params = params.append('regionType', regionType.toString())
    }
    if (enableCities) {
      params = params.append('enableCities', enableCities.toString())
    }

    return this.http.get(this.REST_API_SERVER + 'regions/', {
      params,
      headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }
    })
  }

  public getRegionById (id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + id,
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public updateRegion (region: Region, id: string): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'regions/' + id, { region },
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public deleteRegion (id: string): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'regions/' + id,
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }

  public deleteAllRegions (): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'regions/',
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }
}
