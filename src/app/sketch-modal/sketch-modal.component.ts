import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResumeLookalikeComponent } from '../resume-lookalike/resume-lookalike.component';

@Component({
  selector: 'app-sketch-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ResumeLookalikeComponent],
  templateUrl: './sketch-modal.component.html',
  styleUrls: ['./sketch-modal.component.css']
})
export class SketchModalComponent {
  email: string = '';
  isClosing = false;

  @ViewChild('borderRect') borderRect!: ElementRef<SVGRectElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const rect = this.borderRect.nativeElement;
    const length = rect.getTotalLength();

    // Set initial values
    this.renderer.setStyle(rect, 'strokeDasharray', `${length}`);
    this.renderer.setStyle(rect, 'strokeDashoffset', `${length}`);

    // Force browser reflow
    void rect.getBoundingClientRect();

    // Add animation class
    rect.classList.add('sketch-animate');
  }

  closeModal() {
    this.isClosing = true;
    setTimeout(() => {
      this.isClosing = false;
      const event = new CustomEvent('close');
      window.dispatchEvent(event);
    }, 800); // match CSS animation delay
  }
}
