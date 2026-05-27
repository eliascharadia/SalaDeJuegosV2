import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resultadosencuestas } from './resultadosencuestas';

describe('Resultadosencuestas', () => {
  let component: Resultadosencuestas;
  let fixture: ComponentFixture<Resultadosencuestas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resultadosencuestas],
    }).compileComponents();

    fixture = TestBed.createComponent(Resultadosencuestas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
