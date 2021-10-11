import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycompComponent } from './paycomp.component';

describe('PaycompComponent', () => {
  let component: PaycompComponent;
  let fixture: ComponentFixture<PaycompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaycompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaycompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
