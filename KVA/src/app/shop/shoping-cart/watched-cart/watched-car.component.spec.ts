import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArivedCartComponent } from './watched-cart.component';

describe('ArivedCartComponent', () => {
  let component: ArivedCartComponent;
  let fixture: ComponentFixture<ArivedCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArivedCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArivedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
