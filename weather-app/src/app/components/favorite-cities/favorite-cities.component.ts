import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";

interface CityWeather {
    temperature: number;
    windspeed: number;
    weathercode: number;
}

interface FavoriteCity {
    name: string;
    backgroundUrl: string;
    latitude: number;
    longitude: number;
    weather: CityWeather | null;
}

@Component({
    selector: 'app-favorite-cities',
    standalone: true,
    imports: [NgForOf, HttpClientModule, NgIf, SidebarComponent],
    templateUrl: './favorite-cities.component.html',
    styleUrls: ['./favorite-cities.component.scss']
})
export class FavoriteCitiesComponent implements OnInit {
    favoriteCities: FavoriteCity[] = [
        {
            name: 'Paris',
            backgroundUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
            latitude: 48.8566,
            longitude: 2.3522,
            weather: null
        },
        {
            name: 'New York',
            backgroundUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
            latitude: 40.7128,
            longitude: -74.0060,
            weather: null
        },
        {
            name: 'Tokyo',
            backgroundUrl: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80',
            latitude: 35.6762,
            longitude: 139.6503,
            weather: null
        },
        {
            name: 'Barcelona',
            backgroundUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            latitude: 41.3851,
            longitude: 2.1734,
            weather: null
        }
    ];

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.favoriteCities.forEach((city, index) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;
            this.http.get<any>(url).subscribe(data => {
                this.favoriteCities[index].weather = {
                    temperature: data.current_weather.temperature,
                    windspeed: data.current_weather.windspeed,
                    weathercode: data.current_weather.weathercode
                };
            });
        });
    }

    weatherIcon(code: number): string {
        if (code === 0) return '☀️';
        if (code >= 1 && code <= 3) return '🌤️';
        if (code >= 45 && code <= 48) return '🌫️';
        if (code >= 51 && code <= 57) return '🌧️';
        if (code >= 61 && code <= 67) return '🌧️';
        if (code >= 71 && code <= 77) return '❄️';
        if (code >= 80 && code <= 82) return '🌧️';
        if (code >= 95) return '⛈️';
        return '❓';
    }

    selectCity(city: FavoriteCity) {
        alert(`You selected ${city.name}`);
    }
}
