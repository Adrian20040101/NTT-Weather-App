import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import {
  Auth,
  createUserWithEmailAndPassword,
  User
} from "@angular/fire/auth";
import {
  Firestore,
  doc,
  getDocs,
  collection,
  query,
  where,
  setDoc
} from "@angular/fire/firestore";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  username = "";
  email = "";
  password = "";
  confirmPassword = "";

  errorMessage = "";
  usernameTaken = false;
  isLoading = false;

  @Output() switchMode = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: Auth,
    private firestore: Firestore
  ) {}

  async onRegister() {
    this.errorMessage = "";
    this.usernameTaken = false;

    if (
      !this.username.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = "Please fill in all fields";
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    this.isLoading = true;

    try {
      const usersRef = collection(this.firestore, "users");
      const q = query(
        usersRef,
        where("username", "==", this.username.trim())
      );
      const usernameSnapshot = await getDocs(q);

      if (!usernameSnapshot.empty) {
        this.usernameTaken = true;
        this.errorMessage = "This username is already taken";
        this.isLoading = false;
        return;
      }

      const cred = await createUserWithEmailAndPassword(
        this.afAuth,
        this.email.trim(),
        this.password
      );
      const user: User = cred.user;
      if (!user) {
        throw new Error("User creation succeeded but no user object returned.");
      }

      const userDocRef = doc(this.firestore, "users", user.uid);
      await setDoc(userDocRef, {
        email: this.email.trim(),
        username: this.username.trim(),
        preferredTemperatureUnit: "celsius"
      });

      this.router.navigate(["/"]);
    } catch (err: any) {
      if (err.code) {
        switch (err.code) {
          case "auth/email-already-in-use":
            this.errorMessage = "This email is already in use";
            break;
          case "auth/invalid-email":
            this.errorMessage = "Please enter a valid email address";
            break;
          case "auth/weak-password":
            this.errorMessage = "Password is too weak";
            break;
          default:
            this.errorMessage = err.message;
        }
      } else {
        this.errorMessage = err.message || "Registration failed";
      }
    } finally {
      this.isLoading = false;
    }
  }

  switchToLogin() {
    this.switchMode.emit("login");
  }
}
