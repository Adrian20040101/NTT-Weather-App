import { Injectable, inject } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "@angular/fire/auth";
import { BehaviorSubject, Observable, filter, take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth = inject(Auth);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private authInitialized = new BehaviorSubject<boolean>(false);

  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  public authInitialized$: Observable<boolean> = this.authInitialized.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      if (!this.authInitialized.value) {
        this.authInitialized.next(true);
      }
    });
  }

  waitForAuthInit(): Observable<User | null> {
    return this.authInitialized$
      .pipe(
        filter((initialized) => initialized),
        take(1)
      )
      .pipe(() => this.currentUser$.pipe(take(1)));
  }

  getAuthState(): Observable<User | null> {
    if (this.authInitialized.value) {
      return this.currentUser$.pipe(take(1));
    }
    return new Observable((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
        observer.complete();
        unsubscribe();
      });
    });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: this.getErrorMessage(error.code) };
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: this.getErrorMessage(error.code) };
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      default:
        return "An error occurred. Please try again.";
    }
  }
}
