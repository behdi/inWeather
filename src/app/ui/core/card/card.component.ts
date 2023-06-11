import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card component class.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
})
export class CardComponent {}
