import { Injectable } from '@angular/core'
import { HttpParams, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class LogService {
  private REST_API_SERVER = environment.apiEndpoint
  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  public getAllLogs (subjectId: string, pageNum: number, pageLimit: number): Observable<any> {
    const params = new HttpParams()
      .append('subjectId', subjectId)
      .append('pageNum', pageNum.toString())
      .append('pageLimit', pageLimit.toString())

    return this.http.get(this.REST_API_SERVER + 'logs/',
      {
        params,
        headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }
      })
  }

  public getLogById (id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'logs/' + id,
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
  }
}
