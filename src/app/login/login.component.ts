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
  email = '';
  password = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private loadingoverlay: LoadingOverlayComponent
  ) {}

  login () {
    this.loadingoverlay.showLoading()

    this.auth.login(this.email, this.password).subscribe(() => {
      this.loadingoverlay.hideLoading()
      this.router.navigateByUrl('/home')
    },
    (err: Error) => {
      this.loadingoverlay.hideLoading()
      alert(err.message)
    })
  }
}

 
