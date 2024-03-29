import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingOverlayComponent } from '../loading-overlay/loadingoverlay.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private loadingOverlay: LoadingOverlayComponent
  ) {}

  login () {
    this.loadingOverlay.showLoading()

    this.auth.login(this.user.email, this.user.password).subscribe(() => {
      this.loadingOverlay.hideLoading()
      this.router.navigateByUrl('/home')
    },
    (err: Error) => {
      this.loadingOverlay.hideLoading()
      alert(err.message)
    })
  }
}

 
