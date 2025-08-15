import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SketchModalComponent } from '../sketch-modal/sketch-modal.component'; 
import { ResumeLookalikeComponent } from '../resume-lookalike/resume-lookalike.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,SketchModalComponent, ResumeLookalikeComponent], // <-- Import CommonModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showLinks = true;
  marginLeft = '3rem';
  showModal = false;
  isModalOpen = false;

openModal() {
  this.isModalOpen = true;
}
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private route: Router,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // All browser-specific code goes inside this block
      this.showLinks = window.innerWidth > 768;
      window.addEventListener('close', () => this.isModalOpen = false);
    }
  }

  indicatorPositionChange(section:any){
    if(section == 'work'){
      this.marginLeft = '3rem';
    } else{
      this.marginLeft = '8rem';
    }

  }

  toggleLinks() {
    this.showLinks = !this.showLinks;
  }
  navigate(section:any) {
    if(section == 'info'){
      this.route.navigate([section]);
    } else{
      this.route.navigate([""])
    }
  }
}
