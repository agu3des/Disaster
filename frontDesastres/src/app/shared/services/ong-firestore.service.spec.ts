import { TestBed } from '@angular/core/testing';

import { OngFirestoreService } from './ong-firestore.service';

describe('OngFirestoreService', () => {
  let service: OngFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OngFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
