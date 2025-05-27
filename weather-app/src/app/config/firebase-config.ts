import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB0F_8SOVJZmoFShAU0m-_H0I3zQI0RRqw",
  authDomain: "ntt-weather-app.firebaseapp.com",
  projectId: "ntt-weather-app",
  storageBucket: "ntt-weather-app.firebasestorage.app",
  messagingSenderId: "1033833579017",
  appId: "1:1033833579017:web:0befc743424877de58eed8",
  measurementId: "G-PQZBDEY95F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);