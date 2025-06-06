import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { Observable, map, take } from "rxjs"
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        if (!user) {
          return true
        } else {
          this.router.navigate(["/"])
          return false
        }
      }),
    )
  }
}
