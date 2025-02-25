import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerManagerComponent } from './volunteer-manager.component';

describe('VolunteerManagerComponent', () => {
  let component: VolunteerManagerComponent;
  let fixture: ComponentFixture<VolunteerManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolunteerManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
