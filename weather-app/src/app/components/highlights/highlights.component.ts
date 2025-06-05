import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightCardComponent } from './highlight-card/highlight-card.component';
import { TemperatureService } from '../../services/temperature.service';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, HighlightCardComponent],
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
})
export class HighlightsComponent implements OnInit, OnChanges {
  @Input() weatherData: any;

  highlights = [
    { title: 'Temperature', value: '--', icon: 'thermostat' },
    { title: 'Wind Speed', value: '--', icon: 'air' },
    { title: 'Humidity', value: '--', icon: 'water_drop' },
    { title: 'Pressure', value: '--', icon: 'speed' },
  ];

  constructor(private tempService: TemperatureService) {
    this.tempService.preferredUnit$.subscribe(() => {
      if (this.weatherData) {
        this.updateHighlights();
      }
    });
  }

  ngOnInit() {
    this.tempService.isLoaded.subscribe((loaded) => {
      if (loaded && this.weatherData) {
        this.updateHighlights();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weatherData'] && this.weatherData && this.tempService.isLoaded.value) {
      this.updateHighlights();
    }
  }

  private updateHighlights() {
    this.highlights = [
      {
        title: 'Temperature',
        value: this.tempService.format(this.weatherData.temperature),
        icon: 'thermostat',
      },
      {
        title: 'Wind Speed',
        value: `${this.weatherData.windspeed} km/h`,
        icon: 'air',
      },
      {
        title: 'Humidity',
        value: `${this.weatherData.humidity}%`,
        icon: 'water_drop',
      },
      {
        title: 'Pressure',
        value: `${this.weatherData.pressure} hPa`,
        icon: 'speed',
      },
    ];
  }
}
