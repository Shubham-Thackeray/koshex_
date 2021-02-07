import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPmInputComponent } from './custom-pm-input.component';

describe('CustomPmInputComponent', () => {
  let component: CustomPmInputComponent;
  let fixture: ComponentFixture<CustomPmInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPmInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
