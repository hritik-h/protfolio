import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchModalComponent } from './sketch-modal.component';

describe('SketchModalComponent', () => {
  let component: SketchModalComponent;
  let fixture: ComponentFixture<SketchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SketchModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SketchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
