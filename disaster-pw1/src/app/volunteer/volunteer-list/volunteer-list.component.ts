import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { Volunteer } from '../../shared/model/volunteer';
import { VolunteerRestService } from "../../shared/services/volunteer-rest.service";
// import { VolunteerFirestoreService } from "../../shared/services/volunteer-firestore.service";
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
    private volunteerService: VolunteerRestService, 
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
  
  private get currentUser(): any {
    const userJson = localStorage.getItem('user_logged_in');
    return userJson ? JSON.parse(userJson) : null;
  }

  isOwner(item: any): boolean {
    const user = this.currentUser;
    return !!(user && item.createdBy && item.createdBy.id === user.id);
  }

  canEdit(volunteer: any): boolean {
    return this.isOwner(volunteer);
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
      this.volunteerService.remove(volunteerToRemove.id).subscribe({
        next: () => {
          this.VOLUNTEERS = this.VOLUNTEERS.filter(v => v.id !== volunteerToRemove.id);
        },
        error: (err) => {
          console.error('Error to delete:', err);
        }
      });
    }
  }
  
  edit(volunteer: Volunteer) {
    this.router.navigate([`edit-volunteer`, volunteer.id]);
  }
}
