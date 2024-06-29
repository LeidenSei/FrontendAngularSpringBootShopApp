import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedDetailComponent } from './ordered-detail.component';

describe('OrderedDetailComponent', () => {
  let component: OrderedDetailComponent;
  let fixture: ComponentFixture<OrderedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderedDetailComponent]
    });
    fixture = TestBed.createComponent(OrderedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
