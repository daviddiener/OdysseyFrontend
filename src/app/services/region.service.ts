import { Injectable } from '@angular/core'
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Region, Type } from '../_models/region'
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class RegionService {
  private REST_API_SERVER = environment.apiEndpoint
  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  headers = new HttpHeaders()
  .set('Authorization', `Bearer ${this.authenticationService.getToken()}`); 
  

  public createRegion (): Observable<any> {
    return this.http.post(this.REST_API_SERVER + 'regions/', {}, { headers: this.headers })
  }

  public getAllRegions (): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/', { headers: this.headers })
  }

  public getPartRegions (pageNum: number, pageLimit: number): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/', {
      params: new HttpParams()
        .append('pageNum', pageNum.toString())
        .append('pageLimit', pageLimit.toString()),
      headers: this.headers
    })
  }

  public getRegionChunk (x: number, y: number, range: number): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/', {
      params: new HttpParams()
        .append('x', x.toString())
        .append('y', y.toString())
        .append('range', range.toString()),
      headers: this.headers 
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

    return this.http.get(this.REST_API_SERVER + 'regions/', { params, headers: this.headers })
  }

  public getRegionById (id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'regions/' + id, { headers: this.headers })
  }

  public updateRegion (region: Region, id: string): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'regions/' + id, { region }, { headers: this.headers })
  }

  public deleteRegion (id: string): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'regions/' + id, { headers: this.headers })
  }

  public deleteAllRegions (): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'regions/', { headers: this.headers })
  }
}
