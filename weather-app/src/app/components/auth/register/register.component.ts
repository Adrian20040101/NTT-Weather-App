import { Component, EventEmitter, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { AuthService } from "../../../services/auth.service"
import { Router } from "@angular/router"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  email = ""
  password = ""
  confirmPassword = ""
  errorMessage = ""
  isLoading = false

  @Output() switchMode = new EventEmitter<string>()

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = "Please fill in all fields"
      return
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match"
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    const result = await this.authService.register(this.email, this.password)

    if (result.success) {
      this.router.navigate(["/"])
    } else {
      this.errorMessage = result.error
    }

    this.isLoading = false
  }

  switchToLogin() {
    this.switchMode.emit("login")
  }
}
