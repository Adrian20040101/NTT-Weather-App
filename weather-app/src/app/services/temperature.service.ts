import { Injectable } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemperatureService {
  preferredUnit$ = new BehaviorSubject<'celsius' | 'fahrenheit'>('celsius');
  public isLoaded = new BehaviorSubject(false);

  constructor(private firestore: Firestore, private auth: Auth) {
    this.init();
  }

  private init() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);

        onSnapshot(userDocRef, (snap) => {
          const data = snap.data();
          const unit = data?.['preferredTemperatureUnit'];
          const finalUnit = unit === 'fahrenheit' ? 'fahrenheit' : 'celsius';
          this.preferredUnit$.next(finalUnit);
          this.isLoaded.next(true);
          console.log('Live update received:', finalUnit);
        });
      } else {
        this.isLoaded.next(true);
      }
    });
  }

  format(tempCelsius: number): string {
    const unit = this.preferredUnit$.getValue();
    if (unit === 'fahrenheit') {
      const fahrenheit = (tempCelsius * 9) / 5 + 32;
      return `${fahrenheit.toFixed(1)}°F`;
    }
    return `${tempCelsius.toFixed(1)}°C`;
  }
}
