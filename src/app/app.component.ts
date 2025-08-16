import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BoodyComponent } from './boody/boody.component';
import { BodyComponent } from './body/body.component';
import { SketchModalComponent } from './sketch-modal/sketch-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,BoodyComponent, BodyComponent,RouterLink,RouterLinkActive,SketchModalComponent, ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-project';
}
