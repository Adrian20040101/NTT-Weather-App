import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(lat: number, lng: number): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,pressure_msl,cloudcover,windspeed_10m,winddirection_10m`;
    return this.http.get(url);
  }  
}
