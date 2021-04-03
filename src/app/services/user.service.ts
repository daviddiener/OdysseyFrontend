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

  public getAllUsers(): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'users/',
    { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get(this.REST_API_SERVER + 'users/' + id,
    { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }

  public updateUser(user: User, id: string): Observable<any> {
    return this.http.put(this.REST_API_SERVER + 'users/' + id, {user},
    { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'users/' + id,
    { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }

  public deleteAllUsers(): Observable<any> {
    return this.http.delete(this.REST_API_SERVER + 'users/',
    { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` }});
  }


}
