import { Component } from '@angular/core';
import { AuthenticationService, RegistrationPayload } from '../services/authentication.service';
import { Router } from '@angular/router';
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
  
  errorMessage: string = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private loadingOverlay: LoadingOverlayComponent
  ) {}
  
  register() {
    if (!this.user.email || !this.user.name || !this.user.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    
    this.loadingOverlay.showLoading();

    this.auth.register(this.user).subscribe(() => {
      this.loadingOverlay.hideLoading();
      this.router.navigateByUrl('/home');
    },
    (err) => {
      this.loadingOverlay.hideLoading();
      // Assuming the backend returns error as { message: "Error message" }
      this.errorMessage = err.error.message || 'An unexpected error occurred.';
    });
  }
}
