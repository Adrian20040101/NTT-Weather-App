import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  searchQuery: string = '';
  suggestions: any[] = [];
  @Output() citySelected = new EventEmitter<{ name: string; lat: number; lng: number }>();

  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient, private weatherService: WeatherService) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.fetchSuggestions(query))
    ).subscribe(results => {
      this.suggestions = results;
    });
  }

  onSearchInput() {
    if (this.searchQuery.length > 2) {
      this.searchSubject.next(this.searchQuery);
    } else {
      this.suggestions = [];
    }
  }

  fetchSuggestions(query: string) {
    const url = `https://us-central1-ntt-weather-app.cloudfunctions.net/autocomplete?input=${query}`;
    return this.http.get<any>(url).pipe(
      switchMap(response => { return [response.cities || []] }
    ))
  }

  onSelectSuggestion(suggestion: any) {
    const placeId = suggestion.place_id;
    const url = `https://us-central1-ntt-weather-app.cloudfunctions.net/geocode?place_id=${placeId}`;

    this.http.get<any>(url).subscribe({
    next: (coords) => {
      this.weatherService.getWeather(coords.lat, coords.lng);

      this.citySelected.emit({
        name: suggestion.structured_formatting.main_text,
        lat: coords.lat,
        lng: coords.lng
      });

      this.suggestions = [];
      this.searchQuery = '';
    },
    error: (err) => {
      console.error('Error fetching geocode:', err);
    }
  });
  }
}
