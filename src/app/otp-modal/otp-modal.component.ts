import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-otp-modal',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './otp-modal.component.html',
  styleUrl: './otp-modal.component.css'
})
export class OtpModalComponent {

  constructor(private http: HttpClient,private resumeService: ServicesService){}

  email = '';
  otp = '';
  otpSent = false;
  isClosing = false;
  tpSent = false;
  otpVerified = false;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() otpVerifiedEvent = new EventEmitter<void>();

  sendOtp() {
    this.http.post(`https://portfolio-backend-3dop.onrender.com/api/send-otp?email=${this.email}`, {}, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.otpSent = true; // Enable OTP input field
        },
        error: (err) => {
          console.error(err);
        }
      });
      this.otpSent = true;
  }

  verifyOtp() {
    this.http.post(`https://portfolio-backend-3dop.onrender.com/api/send-otp?email=${this.email}`, {}, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.otpVerified = true; // Enable OTP input field
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  downloadResume() {
    this.resumeService.downloadResume(this.email, this.otp)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Hrithik_Resume.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err: any) => {
          console.error('Download failed', err);
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
