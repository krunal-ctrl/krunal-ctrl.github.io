import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCounter } from './stat-counter';

describe('StatCounter', () => {
  let component: StatCounter;
  let fixture: ComponentFixture<StatCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatCounter);
    component = fixture.componentInstance;
    component.stat = { label: 'Years shipping software', count: 4, suffix: '+' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the initial value immediately, without waiting for the reveal animation', () => {
    expect(component.displayValue()).toBe(4);
  });
});
