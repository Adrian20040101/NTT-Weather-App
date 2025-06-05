import { Component, EventEmitter, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { AuthService } from "../../../services/auth.service"
import { Router } from "@angular/router"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email = ""
  password = ""
  errorMessage = ""
  isLoading = false

  @Output() switchMode = new EventEmitter<string>()

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = "Please fill in all fields"
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    const result = await this.authService.login(this.email, this.password)

    if (result.success) {
      this.router.navigate(["/"])
    } else {
      this.errorMessage = result.error
    }

    this.isLoading = false
  }

  switchToRegister() {
    this.switchMode.emit("register")
  }
}
