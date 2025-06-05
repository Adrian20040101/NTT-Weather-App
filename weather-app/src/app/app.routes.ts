import { Routes } from '@angular/router';
import {FavoriteCitiesComponent} from "./components/favorite-cities/favorite-cities.component";
import {LocationCardComponent} from "./components/location-card/location-card.component";

export const routes: Routes = [
  {
    path: '',
    component: LocationCardComponent
  },
  {
    path: 'favorites',
   component: FavoriteCitiesComponent
  }
];
