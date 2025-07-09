import { TestBed } from '@angular/core/testing';

import { VolunteerRestService } from './volunteer-rest.service';

describe('VolunteerRestService', () => {
  let service: VolunteerRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
