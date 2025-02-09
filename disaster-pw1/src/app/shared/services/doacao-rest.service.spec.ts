import { TestBed } from '@angular/core/testing';

import { DoacaoRestService } from './doacao-rest.service';

describe('DoacaoRestService', () => {
  let service: DoacaoRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoacaoRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
