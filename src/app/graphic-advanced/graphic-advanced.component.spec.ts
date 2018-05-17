import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicAdvancedComponent } from './graphic-advanced.component';

describe('GraphicAdvancedComponent', () => {
  let component: GraphicAdvancedComponent;
  let fixture: ComponentFixture<GraphicAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
