import { TestBed } from '@angular/core/testing';

import { QuienSoy } from './quien-soy';

describe('QuienSoy', () => {
  let service: QuienSoy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuienSoy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
