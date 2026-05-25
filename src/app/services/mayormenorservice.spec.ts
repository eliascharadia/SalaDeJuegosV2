import { TestBed } from '@angular/core/testing';

import { Mayormenorservice } from './mayormenorservice';

describe('Mayormenorservice', () => {
  let service: Mayormenorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mayormenorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
