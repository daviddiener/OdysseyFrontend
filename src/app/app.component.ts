import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { version } from '../../package.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isCollapsed = true;
  public version: string = version;
  constructor(public auth: AuthenticationService) {}
}
