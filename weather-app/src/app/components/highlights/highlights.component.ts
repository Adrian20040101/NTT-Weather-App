import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightCardComponent } from './highlight-card/highlight-card.component';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, HighlightCardComponent],
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent {
  highlights = [
    { title: 'Temperature', value: '23°C', icon: 'thermostat' },
    { title: 'Wind Speed', value: '15 km/h', icon: 'air' },
    { title: 'Humidity', value: '62%', icon: 'water_drop' },
    { title: 'Pressure', value: '1015 hPa', icon: 'speed' },
  ];
}
