import { Component } from '@angular/core'
import { AuthenticationService } from './services/authentication.service'
import packageInfo from '../../package.json';
import { environment } from '../environments/environment'
import { LoadingOverlayComponent } from './loading-overlay/loadingoverlay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isCollapsed = true;
  public version: string = packageInfo.version;
  public isProd = environment.production;
  constructor (public auth: AuthenticationService, private loadingoverlay: LoadingOverlayComponent) {}

  get showLoadingOverlay(): boolean {
    return this.loadingoverlay.isLoading;
  }
}
