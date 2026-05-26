import { TestBed } from '@angular/core/testing';

import { SimondiceService } from './simondice-service';

describe('SimondiceService', () => {
  let service: SimondiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimondiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
