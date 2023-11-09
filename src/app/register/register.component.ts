import { Component } from '@angular/core'
import { AuthenticationService, RegistrationPayload } from '../services/authentication.service'
import { Router } from '@angular/router'
import { LoadingOverlayComponent } from '../loading-overlay/loadingoverlay.component';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user: RegistrationPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private loadingoverlay: LoadingOverlayComponent
  ) {}
  
  register () {
    this.loadingoverlay.showLoading()

    this.auth.register(this.user).subscribe(() => {
      this.loadingoverlay.hideLoading()
      this.router.navigateByUrl('/home')
    },
    (err: Error) => {
      this.loadingoverlay.hideLoading()
      alert(err.message)
    })
  }
}
