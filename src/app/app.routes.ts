import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { CreateCharacterPage } from './pages/create-character-page/create-character-page';
import { MapPage } from './pages/map-page/map-page';

export const routes: Routes = [
  { path: 'landing', component: LandingPage },
  { path: 'create-character', component: CreateCharacterPage },
  { path: 'map', component: MapPage },
  { path: '**', redirectTo: 'landing' },
];
