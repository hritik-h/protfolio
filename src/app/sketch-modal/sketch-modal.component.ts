import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResumeLookalikeComponent } from '../resume-lookalike/resume-lookalike.component';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';
@Component({
  selector: 'app-sketch-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ResumeLookalikeComponent, OtpModalComponent],
  templateUrl: './sketch-modal.component.html',
  styleUrls: ['./sketch-modal.component.css']
})
export class SketchModalComponent {
  isClosing = false;
  showOtpModal = false;

  @ViewChild('borderRect') borderRect!: ElementRef<SVGRectElement>;

  constructor(private renderer: Renderer2) {}

  openOtpModal() {
    this.showOtpModal = true;
  }
  
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
