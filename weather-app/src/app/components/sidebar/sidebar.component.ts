import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { doc, getDoc, setDoc } from "@angular/fire/firestore";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  currentUser$ = this.authService.currentUser$;
  isFahrenheit = false;

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      const userDoc = doc(this.firestore, `users/${user.uid}`);
      const snap = await getDoc(userDoc);

      if (snap.exists()) {
        const unit = snap.data()?.["preferredTemperatureUnit"];
        this.isFahrenheit = unit === "fahrenheit";
      }
    }
  }

  async onToggleUnit(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.isFahrenheit = checked;

    const user = this.auth.currentUser;
    if (user) {
      const userDoc = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDoc, { preferredTemperatureUnit: checked ? 'fahrenheit' : 'celsius' }, { merge: true });
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(["/auth"]);
  }

  goToLogin() {
    this.router.navigate(["/auth"]);
  }
}
