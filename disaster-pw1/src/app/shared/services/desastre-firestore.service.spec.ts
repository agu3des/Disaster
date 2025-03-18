import { TestBed } from '@angular/core/testing';

import { DesastreFirestoreService } from './desastre-firestore.service';

describe('DesastreFirestoreService', () => {
  let service: DesastreFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesastreFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
