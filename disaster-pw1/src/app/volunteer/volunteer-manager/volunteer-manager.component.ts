import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Volunteer } from '../../shared/model/volunteer';
import { VolunteerRestService } from "../../shared/services/volunteer-rest.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-volunteer-manager',
  standalone: false,
  templateUrl: './volunteer-manager.component.html',
  styleUrls: ['./volunteer-manager.component.css']
})
export class VolunteerManagerComponent {

  volunteer: Volunteer;
  actionButtonName: string;
  isRegistering: boolean;

  constructor(
    private volunteerService: VolunteerRestService, 
    private mensagemService: MensagemSweetService,
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    this.actionButtonName = 'Register';
    this.isRegistering = true;
    this.volunteer = new Volunteer();

    const editId = this.activatedRoute.snapshot.params['id'];
    if (editId) {
      this.actionButtonName = 'Update';
      this.isRegistering = false;
      this.volunteerService.getById(editId).subscribe(
        fetchedVolunteer => this.volunteer = fetchedVolunteer
      );
    }
  }

  registerOrUpdate() {
    if (this.isRegistering) {
      this.volunteerService.register(this.volunteer).subscribe(
        registeredVolunteer => {
          this.mensagemService.sucesso('Volunteer successfully registered!');
          this.router.navigate(['/volunteer-list']);
        }
      );
    } else {
      this.volunteerService.update(this.volunteer).subscribe(
        updatedVolunteer => {
          this.mensagemService.sucesso('Volunteer successfully updated!');
          this.router.navigate(['/volunteer-list']);
        }
      );
    }
  }

}

