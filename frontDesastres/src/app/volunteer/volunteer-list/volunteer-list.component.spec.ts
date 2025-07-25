import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerListComponent } from './volunteer-list.component';

describe('VolunteerListComponent', () => {
  let component: VolunteerListComponent;
  let fixture: ComponentFixture<VolunteerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolunteerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
