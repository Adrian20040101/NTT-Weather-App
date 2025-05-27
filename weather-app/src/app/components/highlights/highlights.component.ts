import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightCardComponent } from './highlight-card/highlight-card.component';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, HighlightCardComponent],
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
})
export class HighlightsComponent implements OnChanges {
  @Input() weatherData: any;

  highlights = [
    { title: 'Temperature', value: '--', icon: 'thermostat' },
    { title: 'Wind Speed', value: '--', icon: 'air' },
    { title: 'Humidity', value: '--', icon: 'water_drop' },
    { title: 'Pressure', value: '--', icon: 'speed' },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weatherData'] && this.weatherData) {
      this.highlights = [
        { title: 'Temperature', value: `${this.weatherData.temperature}°C`, icon: 'thermostat' },
        { title: 'Wind Speed', value: `${this.weatherData.windspeed} km/h`, icon: 'air' },
        { title: 'Humidity', value: `${this.weatherData.humidity}%`, icon: 'water_drop' },
        { title: 'Pressure', value: `${this.weatherData.pressure} hPa`, icon: 'speed' },
      ];
    }
  }

}
