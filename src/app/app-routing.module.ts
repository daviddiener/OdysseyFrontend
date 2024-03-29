import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from './services/auth-guard.service'
import { Role } from './_models/role'
import { HomeComponent } from './home/home.component'
import { RegionComponent } from './region/region.component'
import { WorldmapComponent } from './worldmap/worldmap.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component'
import { AdministrationComponent } from './administration/administration.component'
import { AboutComponent } from './about/about.component'
import { RegionDetailComponent } from './region-detail/region-detail.component'
import { CityComponent } from './city/city.component'
import { CharacterComponent } from './character/character.component'
import { CharacterDetailComponent } from './character-detail/character-detail.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuardService], data: { roles: [Role.Admin] } },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'characters', component: CharacterComponent, canActivate: [AuthGuardService] },
  { path: 'characters/:id', component: CharacterDetailComponent, canActivate: [AuthGuardService] },
  { path: 'worldmap', component: WorldmapComponent, canActivate: [AuthGuardService] },
  { path: 'regions', component: RegionComponent, canActivate: [AuthGuardService] },
  {
    path: 'regions/:id',
    component: RegionDetailComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'cities', component: CityComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
