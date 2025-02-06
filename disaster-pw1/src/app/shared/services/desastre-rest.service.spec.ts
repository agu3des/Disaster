import { TestBed } from '@angular/core/testing';

import { DesastreRestService } from './desastre-rest.service';

describe('DesastreRestService', () => {
  let service: DesastreRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesastreRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
