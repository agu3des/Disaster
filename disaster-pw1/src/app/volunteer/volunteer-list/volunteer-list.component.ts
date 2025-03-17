import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Volunteer } from '../../shared/model/volunteer';
import { VOLUNTEERS } from '../../shared/model/VOLUNTEERS';
import { VolunteerRestService } from "../../shared/services/volunteer-rest.service";
import { VolunteerFirestoreService } from "../../shared/services/volunteer-firestore.service";

@Component({
  selector: 'app-volunteer-list',
  standalone: false,
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent implements OnInit {
  VOLUNTEERS: Volunteer[] = [];

  constructor(private volunteerService: VolunteerFirestoreService, private router: Router) {}

  ngOnInit() {
    this.volunteerService.list().subscribe(
      volunteers => this.VOLUNTEERS = volunteers
    );
  }

  remove(volunteerToRemove: Volunteer) {
    if (volunteerToRemove.id) {
      this.volunteerService.remove(volunteerToRemove.id).subscribe(
        () => {
          console.log('Removed');
          const volunteerIndex = this.VOLUNTEERS.findIndex(volunteer => volunteer.id === volunteerToRemove.id);
          this.VOLUNTEERS.splice(volunteerIndex, 1);
        }
      );
    }
  }

  edit(volunteer: Volunteer) {
    this.router.navigate([`edit-volunteer`, volunteer.id]);
  }
}
