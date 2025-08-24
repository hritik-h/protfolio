import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() index!: number;
  @Input() backgroundColor!: string;
  constructor(){
    const height = `${30 - this.index}rem`;
    const width = `${20 - this.index * 0.5}rem`;
  }

}
