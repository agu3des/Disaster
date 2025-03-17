import { TestBed } from '@angular/core/testing';

import { VolunteerFirestoreService } from './volunteer-firestore.service';

describe('VolunteerFirestoreService', () => {
  let service: VolunteerFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
