import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simondice } from './simondice';

describe('Simondice', () => {
  let component: Simondice;
  let fixture: ComponentFixture<Simondice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simondice],
    }).compileComponents();

    fixture = TestBed.createComponent(Simondice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
