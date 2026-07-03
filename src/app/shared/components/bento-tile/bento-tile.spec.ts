import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentoTile } from './bento-tile';

describe('BentoTile', () => {
  let component: BentoTile;
  let fixture: ComponentFixture<BentoTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentoTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BentoTile);
    component = fixture.componentInstance;
    component.tile = { id: 'cloud', title: 'Cloud & DevOps', description: 'Test description.', emoji: '☁️' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
