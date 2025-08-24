import { Component, ElementRef, HostListener, QueryList, ViewChildren, AfterViewInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card.model';
import { gsap } from 'gsap';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements AfterViewInit {
  cards: Card[] = [
    { title: 'Core Java', description: 'Excluding Java 8 Features', color: '#00b894' },
    { title: 'Java 8', description: 'Java 8 Features', color: '#a29bfe' },
    { title: 'Microservices', description: 'Microservices Notes', color: '#fdcb6e' },
    { title: 'System Design', description: 'System Design Prep', color: '#e17055' },
    { title: 'Spring Boot', description: 'Spring Boot in Depth', color: '#6c5ce7' }
  ];

  private speed = 0;
  private spacing = 300;
  private animationFrame: number | null = null;
  private cardElements: HTMLElement[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @ViewChildren(CardComponent, { read: ElementRef }) cardRefs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cardElements = this.cardRefs.toArray().map(el => el.nativeElement);
      const centerX = window.innerWidth / 2;

      // Initial positions
      this.cardElements.forEach((card, index) => {
        gsap.set(card, { x: index * this.spacing, scale: 0.8 });
      });

      // Start infinite animation loop
      this.animate(centerX);
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault(); // Prevent page from scrolling
      this.speed += event.deltaY * -0.2; // Scroll down → move left, scroll up → move right
    }
  }

  private animate(centerX: number) {
    this.speed *= 0.9; // Smooth deceleration

    this.cardElements.forEach(card => {
      let x = (gsap.getProperty(card, 'x') as number) + this.speed;

      // Wrap-around logic
      if (x < -this.spacing) {
        x += this.spacing * this.cardElements.length;
      } else if (x > this.spacing * (this.cardElements.length - 1)) {
        x -= this.spacing * this.cardElements.length;
      }

      // Scale based on distance from center
      const distanceFromCenter = Math.abs((x + centerX) - centerX);
      const scale = gsap.utils.mapRange(0, centerX, 1.2, 0.6, distanceFromCenter);

      gsap.set(card, { x, scale, zIndex: Math.round(1000 - distanceFromCenter) });
    });

    this.animationFrame = requestAnimationFrame(() => this.animate(centerX));
  }
}

