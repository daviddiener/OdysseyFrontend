import { Component } from '@angular/core';
import { AuthenticationService, RegistrationPayload } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user: RegistrationPayload = {
    email: '',
    name: '',
    password: ''
  };
  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.user).subscribe(() => {
      this.router.navigateByUrl('/home');
    },
    (err: Error) => {
      alert(err.message);
    });
  }
}
