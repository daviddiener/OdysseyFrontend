import { Component } from '@angular/core'
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor (private auth: AuthenticationService, private router: Router) {}

  login () {
    this.auth.login(this.email, this.password).subscribe(() => {
      this.router.navigateByUrl('/home')
    },
    (err: Error) => {
      alert(err.message)
    })
  }
}
