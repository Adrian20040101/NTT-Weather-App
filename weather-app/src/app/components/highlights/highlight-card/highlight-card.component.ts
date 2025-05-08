import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highlight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlight-card.component.html',
  styleUrls: ['./highlight-card.component.scss'],
  host: {
    class: 'highlight-card',
    style: 'display: block'
  }
})
export class HighlightCardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() icon!: string;
}
