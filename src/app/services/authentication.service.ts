import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { User } from '../_models/user'
import { Role } from '../_models/role'

export interface RegistrationPayload{
  email: string;
  name: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private token: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private REST_API_SERVER = environment.apiEndpoint

  constructor (private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getUserDetails())
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue (): User {
    return this.currentUserSubject.value
  }

  public getToken (): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token')
    }
    return this.token
  }

  public getUserDetails (): User {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn (): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public isAdmin (): boolean {
    const user = this.getUserDetails()
    if (user && user.role === Role.Admin) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register (user: RegistrationPayload): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + 'register', user)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('mean-token', data.token)
          this.token = data.token
          this.currentUserSubject.next(this.getUserDetails())
        }

        return data.user
      }))
  }

  public login (email: string, password: string) {
    return this.http.post<any>(this.REST_API_SERVER + 'login', { email, password })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('mean-token', data.token)
          this.token = data.token
          this.currentUserSubject.next(this.getUserDetails())
        }

        return data.user
      }))
  }

  public logout (): void {
    this.token = ''
    window.localStorage.removeItem('mean-token')
    this.router.navigateByUrl('/login')
  }
}
