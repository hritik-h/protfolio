import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-otp-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './otp-modal.component.html',
  styleUrl: './otp-modal.component.css'
})
export class OtpModalComponent {

  constructor(private http: HttpClient, private resumeService: ServicesService) {}

  email = '';
  otp = '';
  otpSent = false;
  isClosing = false;
  otpVerified = false;
  
  // New properties for enhanced UX
  isSending = false;
  isDownloading = false;
  isResending = false;
  emailError = false;
  otpError = false;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() otpVerifiedEvent = new EventEmitter<void>();

  sendOtp() {
    if (!this.email) {
      this.emailError = true;
      return;
    }
    
    this.isSending = true;
    this.emailError = false;
    
    this.http.post(`https://portfolio-backend-3dop.onrender.com/api/send-otp?email=${this.email}`, {}, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.otpSent = true;
          this.isSending = false;
        },
        error: (err) => {
          console.error(err);
          this.isSending = false;
          this.emailError = true;
        }
      });
  }

  resendOtp() {
    this.isResending = true;
    this.otpError = false;
    
    this.http.post(`https://portfolio-backend-3dop.onrender.com/api/send-otp?email=${this.email}`, {}, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.isResending = false;
        },
        error: (err) => {
          console.error(err);
          this.isResending = false;
          this.otpError = true;
        }
      });
  }

  verifyOtp() {
    this.http.post(`https://portfolio-backend-3dop.onrender.com/api/send-otp?email=${this.email}`, {}, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.otpVerified = true;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  downloadResume() {
    if (!this.otp || this.otp.length < 6) {
      this.otpError = true;
      return;
    }
    
    this.isDownloading = true;
    this.otpError = false;
    
    this.resumeService.downloadResume(this.email, this.otp)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Hritik_Resume.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          this.isDownloading = false;
          this.close();
        },
        error: (err: any) => {
          console.error('Download failed', err);
          this.isDownloading = false;
          this.otpError = true;
        }
      });
  }

  close() {
    this.isClosing = true;
    setTimeout(() => {
      this.closeModalEvent.emit();
    }, 300);
  }
}
