import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] // <-- use styleUrls (plural)
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() index!: number;
  @Input() backgroundColor!: string;
  @Input() asset!: string;

  @Input() disableHover = false;

  // Reflect the input as a class on the host element
  @HostBinding('class.no-hover') get noHover() { 
    return this.disableHover; 
  }

  img!: string;
  imgClass!: string;

  ngOnInit(): void {
    this.img = 'assets/' + this.asset + '.png';
    this.imgClass = this.asset + '-overlay';
  }
}