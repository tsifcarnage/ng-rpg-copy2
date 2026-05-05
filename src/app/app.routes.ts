import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { CreateCharacterPage } from './pages/create-character-page/create-character-page';
import { MapPage } from './pages/map-page/map-page';
import { InventoryPage } from './pages/inventory-page/inventory-page';
import { CityPage } from './pages/city-page/city-page';
import { userSelectedGuard } from './guards/user-selected-guard';

export const routes: Routes = [
  { path: 'landing', component: LandingPage },
  { path: 'create-character', component: CreateCharacterPage },
  { path: 'map', component: MapPage, canActivate: [userSelectedGuard] },
  { path: 'inventory', component: InventoryPage, canActivate: [userSelectedGuard] },
  { path: 'city', component: CityPage, canActivate: [userSelectedGuard] },
  { path: '**', redirectTo: 'landing' },
];
