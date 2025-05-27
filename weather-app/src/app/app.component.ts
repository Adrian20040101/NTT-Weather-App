import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, SearchbarComponent, LocationCardComponent, HighlightsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app';
  cityName = 'Bucharest';
  weatherData: any = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherForDefaultLocation();
  }

  getWeatherForDefaultLocation() {
    const defaultCoords = { lat: 44.4268, lng: 26.1025 }; // Bucharest (default city) coordinates - later can be changed to a favorite city

    this.weatherService.getWeather(defaultCoords.lat, defaultCoords.lng).subscribe({
      next: (data) => {
        const currentTime = data.current_weather.time;
        const currentHour = currentTime.slice(0, 13);
        const timeIndex = data.hourly.time.findIndex((time: string) =>
          time.startsWith(currentHour)
        );

        this.weatherData = {
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
          humidity: timeIndex !== -1 ? data.hourly.relative_humidity_2m[timeIndex] : '--',
          pressure: timeIndex !== -1 ? data.hourly.pressure_msl[timeIndex] : '--',
        };

        console.log('Default location weather data:', this.weatherData);
      },
      error: (err) => console.error('Error fetching default weather:', err),
    });
  }

  updateCity(newCity: any) {
    this.cityName = newCity.name;

    this.weatherService.getWeather(newCity.lat, newCity.lng).subscribe({
    next: (data) => {
      const currentTime = data.current_weather.time; // example "2024-05-27T11:00", but i only need hour, so slice it
      const currentHour = currentTime.slice(0, 13); // example "2024-05-27T11"

      const timeIndex = data.hourly.time.findIndex((time: string) =>
        time.startsWith(currentHour)
      );

      this.weatherData = {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        humidity: timeIndex !== -1 ? data.hourly.relative_humidity_2m[timeIndex] : '--',
        pressure: timeIndex !== -1 ? data.hourly.pressure_msl[timeIndex] : '--',
      };

      console.log('Processed Weather Data:', this.weatherData);
    },
      error: (err) => console.error('Error fetching weather:', err),
    });
  }
}
