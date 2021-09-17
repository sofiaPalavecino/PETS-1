import { TestBed } from '@angular/core/testing';

import { ObtenerDataService } from './obtener-data.service';

describe('ObtenerDataService', () => {
  let service: ObtenerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
