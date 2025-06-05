import {CommonModule} from "@angular/common"
import {Component} from "@angular/core"
import {FormsModule} from "@angular/forms"
import {Router, RouterModule} from "@angular/router"
import {AuthService} from "../../services/auth.service"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  currentUser$ = this.authService.currentUser$

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  async logout() {
    await this.authService.logout()
    this.router.navigate(["/auth"])
  }

  goToLogin() {
    this.router.navigate(["/auth"])
  }
}
