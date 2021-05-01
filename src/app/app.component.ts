import { Component } from '@angular/core'
import { AuthenticationService } from './services/authentication.service'
import { version } from '../../package.json'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isCollapsed = true;
  public version: string = version;
  public isProd = environment.production;
  constructor (public auth: AuthenticationService) {}
}
