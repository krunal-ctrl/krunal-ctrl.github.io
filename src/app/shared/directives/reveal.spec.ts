import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `<div appReveal></div>`,
})
class HostComponent {}

describe('Reveal', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el).toBeTruthy();
  });
});
