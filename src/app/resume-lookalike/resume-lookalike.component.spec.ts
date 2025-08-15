import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeLookalikeComponent } from './resume-lookalike.component';

describe('ResumeLookalikeComponent', () => {
  let component: ResumeLookalikeComponent;
  let fixture: ComponentFixture<ResumeLookalikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeLookalikeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeLookalikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
