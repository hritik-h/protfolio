import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-boody',
  standalone: true,
  imports: [],
  templateUrl: './boody.component.html',
  styleUrl: './boody.component.css'
})
export class BoodyComponent {
  @ViewChild('background', { static: true }) background!: ElementRef;
  @ViewChild('mountain', { static: true }) mountain!: ElementRef;
  @ViewChild('sun', { static: true }) sun!: ElementRef;
  @ViewChild('man', { static: true }) man!: ElementRef;

  onMouseMove(event: MouseEvent) {
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;

    // Apply transformations for each layer
    this.setParallaxEffect(this.background.nativeElement, x, y, 15);
    this.setParallaxEffect(this.mountain.nativeElement, x, y, 30);
    this.setParallaxEffect(this.sun.nativeElement, x, y, 45);
    this.setParallaxEffect(this.man.nativeElement, x, y, 60);

    console.log(x,y)
  }

  setParallaxEffect(element: HTMLElement, x: number, y: number, intensity: number) {
    // Adjust the transform based on cursor position and intensity
    const moveX = x * intensity;
    const moveY = y * intensity;

    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
}


