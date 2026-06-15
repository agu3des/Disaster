import { TestBed } from '@angular/core/testing';

import { DisasterRestService } from './disaster-rest.service';

describe('DisasterRestService', () => {
  let service: DisasterRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisasterRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
