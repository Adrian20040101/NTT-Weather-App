import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyAHjhRLfxhEYCld8uKiTrNb1oKsoiJbWkQ",
  authDomain: "ntt-weather-app-3eee6.firebaseapp.com",
  projectId: "ntt-weather-app-3eee6",
  storageBucket: "ntt-weather-app-3eee6.firebasestorage.app",
  messagingSenderId: "461395107305",
  appId: "1:461395107305:web:434e4ff62304bccb40ff78",
  measurementId: "G-QQDJEZ529Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);