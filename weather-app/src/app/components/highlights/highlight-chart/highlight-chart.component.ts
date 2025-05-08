import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-highlight-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './highlight-chart.component.html',
  styleUrls: ['./highlight-chart.component.scss']
})
export class HighlightChartComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        data: [14, 17, 21, 22, 19, 16],
        label: 'Temperature (°C)',
        fill: false,
        borderColor: '#f3a310',
        tension: 0.4
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public lineChartType : 'line' = 'line';
}
