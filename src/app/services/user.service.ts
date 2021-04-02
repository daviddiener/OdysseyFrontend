import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { AuthenticationService } from './authentication.service';
import { WINDOW } from './window.provider';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {
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

  private request(method: 'get'|'getById'|'getByCityId'|'getByUserId'|'put'|'delete'|'deleteById',
                  userId?: string, user?: User): Observable<any> {
    let request;

    if (method === 'get') {
      request = this.http.get(this.REST_API_SERVER + 'users/',
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'getById') {
      request = this.http.get(this.REST_API_SERVER + 'users/' + userId, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'put') {
      request = this.http.put(this.REST_API_SERVER + 'users/' + userId, {user},
      { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    } else if (method === 'deleteById') {
      request = this.http.delete(this.REST_API_SERVER + 'users/' + userId, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
    }

    return request;
  }

  public getAllUsers(): Observable<any> {
    return this.request('get');
  }

  public getUserById(id: string): Observable<any> {
    return this.request('getById', id);
  }

  public updateUser(newCharacter: User, id: string): Observable<any> {
    return this.request('put', id, newCharacter);
  }

  public deleteUser(id: string): Observable<any> {
    return this.request('deleteById', id);
  }

}
