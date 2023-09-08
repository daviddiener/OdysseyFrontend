import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../_models/user'
import { AuthenticationService } from './authentication.service'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class UserService {
  private REST_API_SERVER = environment.apiEndpoint

  constructor (private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  headers = new HttpHeaders()
  .set('Authorization', `Bearer ${this.authenticationService.getToken()}`); 

  public getAllUsers (): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'users/', { headers: this.headers })
  }

  public getUserById (id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'users/' + id, { headers: this.headers })
  }

  public updateUser (user: User, id: string): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'users/' + id, user, { headers: this.headers })
  }

  public deleteUser (id: string): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'users/' + id, { headers: this.headers })  
  }

  public deleteAllUsers (): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'users/', { headers: this.headers })
  }
}
