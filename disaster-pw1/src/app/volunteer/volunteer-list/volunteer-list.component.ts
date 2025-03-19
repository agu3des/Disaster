import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { Volunteer } from '../../shared/model/volunteer';
import { VolunteerFirestoreService } from "../../shared/services/volunteer-firestore.service";
import { ConfirmationDialogComponent } from '../../layout/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-volunteer-list',
  standalone: false,
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent implements OnInit {
  VOLUNTEERS: Volunteer[] = [];

  constructor(
    private volunteerService: VolunteerFirestoreService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.volunteerService.list().subscribe(
      volunteers => this.VOLUNTEERS = volunteers
    );
  }

  trackVolunteerId(index: number, volunteer: any): number {
    return volunteer.id;  
  }
  
  getVolunteerIcon(volunteer: any): string {
    return volunteer.name ? 'person' : 'account_circle';
  }

  confirmRemove(volunteer: Volunteer) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${volunteer.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(volunteer);
      }
    });
  }

  remove(volunteerToRemove: Volunteer) {
    if (volunteerToRemove.id) {
      this.volunteerService.remove(volunteerToRemove.id).subscribe(() => {
        this.VOLUNTEERS = this.VOLUNTEERS.filter(v => v.id !== volunteerToRemove.id);
      });
    }
  }

  edit(volunteer: Volunteer) {
    this.router.navigate([`edit-volunteer`, volunteer.id]);
  }
}
