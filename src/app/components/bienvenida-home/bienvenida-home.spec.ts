import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaHome } from './bienvenida-home';

describe('BienvenidaHome', () => {
  let component: BienvenidaHome;
  let fixture: ComponentFixture<BienvenidaHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidaHome],
    }).compileComponents();

    fixture = TestBed.createComponent(BienvenidaHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
