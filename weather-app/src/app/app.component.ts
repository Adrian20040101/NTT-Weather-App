import { Component } from "@angular/core";
import { Router, RouterOutlet, NavigationEnd, Event as RouterEvent } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./services/auth.service";
import { filter } from "rxjs";
import { TemperatureService } from "./services/temperature.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  title = "weather-app";
  isAuthRoute = false;

  constructor(public authService: AuthService, private router: Router, private temperatureService: TemperatureService) {
    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.isAuthRoute = event.urlAfterRedirects.includes('/auth');
      });
  }
}
