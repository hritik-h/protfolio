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
    { title: 'Core Java', description: 'Comprehensive guide excluding Java 8', color: '#A61027', asset:'farmer' },
{ title: 'Java 8', description: 'Detailed notes on Java 8 features', color: '#A61027', asset:'man-1' },
{ title: 'Microservices', description: 'Essential concepts for microservices architecture', color: '#A61027', asset:'man-2' },
{ title: 'System Design', description: 'Key patterns for scalable system design', color: '#A61027', asset:'man-4' },
{ title: 'Spring Boot', description: 'In-depth overview of Spring Boot essentials', color: '#A61027', asset:'man-5' }

  ];

  private speed = 0;
  private spacing = 300;
  private animationFrame: number | null = null;
  private scrollTimeout: any; // Declare scrollTimeout property
  isScrolling = false;
  private cardElements: HTMLElement[] = [];
  private cardPositions: number[] = [];
  private totalWidth: number = 0;
  private centerX: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @ViewChildren(CardComponent, { read: ElementRef }) cardRefs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cardElements = this.cardRefs.toArray().map(el => el.nativeElement);
      this.centerX = window.innerWidth / 2;
      this.totalWidth = this.spacing * this.cardElements.length;

      // Initialize positions array
      this.cardPositions = this.cardElements.map((_, index) => index * this.spacing);

      // Initial positions
      this.cardElements.forEach((card, index) => {
        gsap.set(card, { x: this.cardPositions[index], scale: 0.8 });
      });

      // Start infinite animation loop
      this.animate();
    }
  }


private markScrolling() {
  this.isScrolling = true;
  clearTimeout(this.scrollTimeout);
  this.scrollTimeout = setTimeout(() => this.isScrolling = false, 150);
}

  @HostListener('window:scroll',['$event'])
  onScroll(){
    this.isScrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(()=>{
      this.isScrolling = false;
    },150);
  }
  @HostListener('wheel', ['$event'])
onWheel(event: WheelEvent) {
  event.preventDefault();
  this.speed += event.deltaY * -0.04;
  this.markScrolling(); // <--- added
}


  private animate() {
    this.speed *= 0.9; // Smooth deceleration

    if (Math.abs(this.speed) > 0.05) {
      this.markScrolling(); 
    }
    
    // Batch DOM updates for better performance
    const updates: Array<{element: HTMLElement, props: any}> = [];
    
    this.cardElements.forEach((card, index) => {
      // Update position in our tracking array
      this.cardPositions[index] += this.speed;
      let x = this.cardPositions[index];

      // Wrap-around logic with proper boundaries
      const leftBoundary = -this.spacing;
      const rightBoundary = this.totalWidth - this.spacing;
      
      if (x < leftBoundary) {
        x += this.totalWidth;
        this.cardPositions[index] = x;
      } else if (x > rightBoundary) {
        x -= this.totalWidth;
        this.cardPositions[index] = x;
      }

      // Calculate scale based on distance from center (optimized)
      const distanceFromCenter = Math.abs(x);
      const scale = Math.max(0.6, Math.min(1.2, 1.2 - (distanceFromCenter / this.centerX) * 0.6));

      updates.push({
        element: card,
        props: { 
          x, 
          scale, 
          zIndex: Math.round(1000 - distanceFromCenter) 
        }
      });
    });

    // Apply all updates in a single batch
    updates.forEach(update => {
      gsap.set(update.element, update.props);
    });

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

