import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaluletteComponent } from './calulette.component';

describe('CaluletteComponent', () => {
  let component: CaluletteComponent;
  let fixture: ComponentFixture<CaluletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaluletteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaluletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
