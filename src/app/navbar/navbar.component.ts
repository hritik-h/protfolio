import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // <-- Import CommonModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showLinks = true;
  marginLeft = '3rem';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private route: Router,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.showLinks = window.innerWidth > 768;
      
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
