import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";
import {getAnalytics} from "firebase/analytics";
import {provideAnalytics} from "@angular/fire/analytics";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {firebaseConfig} from "./app/config/firebase-config";
import {initializeApp} from "firebase/app";
import {provideFirebaseApp} from "@angular/fire/app";

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers!,
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics())
  ]
});
