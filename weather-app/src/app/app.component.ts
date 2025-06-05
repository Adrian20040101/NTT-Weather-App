import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "./services/auth.service"
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "weather-app"

  constructor(public authService: AuthService) {}
}
