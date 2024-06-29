import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderedComponent } from './list-ordered.component';

describe('ListOrderedComponent', () => {
  let component: ListOrderedComponent;
  let fixture: ComponentFixture<ListOrderedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrderedComponent]
    });
    fixture = TestBed.createComponent(ListOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
