// Angular
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

// Material Design
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatRadioModule } from '@angular/material/radio'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Components
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RegionComponent } from './region/region.component'
import { RegionDetailComponent } from './region-detail/region-detail.component'
import { AboutComponent } from './about/about.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CityComponent } from './city/city.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { AuthenticationService } from './services/authentication.service'
import { AuthGuardService } from './services/auth-guard.service'
import { ProfileComponent } from './profile/profile.component'
import { HomeComponent } from './home/home.component'
import { CharacterComponent } from './character/character.component'
import { CharacterDetailComponent } from './character-detail/character-detail.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { WorldmapComponent } from './worldmap/worldmap.component'
import { AdministrationComponent } from './administration/administration.component';
import { LoadingOverlayComponent } from './loading-overlay/loadingoverlay.component'

@NgModule({
  declarations: [
    AppComponent,
    RegionDetailComponent,
    AboutComponent,
    RegionComponent,
    CityComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    CharacterComponent,
    CharacterDetailComponent,
    WorldmapComponent,
    AdministrationComponent,
    LoadingOverlayComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    FontAwesomeModule,
    MatRadioModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
