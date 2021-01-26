import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RegionComponent } from './region/region.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { RegionDetailComponent } from './region-detail/region-detail.component';
import { CityComponent } from './city/city.component';
import { CharacterComponent } from './character/character.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'characters', component: CharacterComponent, canActivate: [AuthGuardService] },
  { path: 'characters/:id', component: CharacterDetailComponent, canActivate: [AuthGuardService] },
  { path: 'regions', component: RegionComponent, canActivate: [AuthGuardService] },
  { path: 'regions/:id' , component: RegionDetailComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'cities', component: CityComponent, canActivate: [AuthGuardService]}
  ]},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
