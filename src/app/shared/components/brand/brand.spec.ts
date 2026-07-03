import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Brand } from './brand';

describe('Brand', () => {
  let component: Brand;
  let fixture: ComponentFixture<Brand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Brand],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Brand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
