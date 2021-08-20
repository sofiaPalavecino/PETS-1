import { TestBed } from '@angular/core/testing';

import { PaseosService } from './paseos.service';

describe('PaseosService', () => {
  let service: PaseosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaseosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
