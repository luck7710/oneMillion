import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStrategyComponent } from './dialog-strategy.component';

describe('DialogStrategyComponent', () => {
  let component: DialogStrategyComponent;
  let fixture: ComponentFixture<DialogStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
