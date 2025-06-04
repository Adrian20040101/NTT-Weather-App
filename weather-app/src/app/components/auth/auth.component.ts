import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./register/register.component"

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  currentMode: "login" | "register" = "login"

  switchMode(mode: string) {
    this.currentMode = mode as "login" | "register"
  }
}
