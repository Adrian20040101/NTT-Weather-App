import { Injectable } from "@angular/core"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { BehaviorSubject, type Observable } from "rxjs"

const firebaseConfig = {
  apiKey: "AIzaSyB0F_8SOVJZmoFShAU0m-_H0I3zQI0RRqw",
  authDomain: "ntt-weather-app.firebaseapp.com",
  projectId: "ntt-weather-app",
  storageBucket: "ntt-weather-app.firebasestorage.app",
  messagingSenderId: "1033833579017",
  appId: "1:1033833579017:web:0befc743424877de58eed8",
  measurementId: "G-PQZBDEY95F",
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private app = initializeApp(firebaseConfig)
  private auth = getAuth(this.app)
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  private authInitialized = new BehaviorSubject<boolean>(false)

  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable()
  public authInitialized$: Observable<boolean> = this.authInitialized.asObservable()

  constructor() {
    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user)
      if (!this.authInitialized.value) {
        this.authInitialized.next(true)
      }
    })
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      return { success: false, error: this.getErrorMessage(error.code) }
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      return { success: false, error: this.getErrorMessage(error.code) }
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email address."
      case "auth/wrong-password":
        return "Incorrect password."
      case "auth/email-already-in-use":
        return "An account with this email already exists."
      case "auth/weak-password":
        return "Password should be at least 6 characters."
      case "auth/invalid-email":
        return "Invalid email address."
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later."
      default:
        return "An error occurred. Please try again."
    }
  }
}
