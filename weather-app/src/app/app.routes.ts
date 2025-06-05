import type { Routes } from "@angular/router"
import { AuthComponent } from "./components/auth/auth.component"
import { MainLayoutComponent } from "./main-layout/main-layout.component"
import { AuthGuard } from "./guards/auth.guard"
import { GuestGuard } from "./guards/guest.guard"
import {FavoriteCitiesComponent} from "./components/favorite-cities/favorite-cities.component";

export const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    canActivate: [GuestGuard], // Only allow access if not logged in
  },
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Require authentication
  },
  {
    path: "home",
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Require authentication
  },
  {
    path: "favorites",
    component: FavoriteCitiesComponent,
    canActivate: [AuthGuard], // Require authentication
  },
  {
    path: "**",
    redirectTo: "",
  }
];
