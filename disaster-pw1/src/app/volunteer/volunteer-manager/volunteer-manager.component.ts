import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { VolunteerFirestoreService } from "../../shared/services/volunteer-firestore.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-volunteer-manager',
  standalone: false,
  templateUrl: './volunteer-manager.component.html',
  styleUrls: ['./volunteer-manager.component.css']
})
export class VolunteerManagerComponent {
  volunteerForm: FormGroup;
  actionButtonName: string;
  isRegistering: boolean;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerFirestoreService, 
    private mensagemService: MensagemSweetService,
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    this.actionButtonName = 'Register';
    this.isRegistering = true;
    this.volunteerForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      imagemUrl: ['']
    });

    const editId = this.activatedRoute.snapshot.paramMap.get('id');
    if (editId) {
      this.actionButtonName = 'Update';
      this.isRegistering = false;
      this.volunteerService.getById(editId).subscribe(volunteer => {
        this.volunteerForm.patchValue(volunteer);
      });
    }
  }

  registerOrUpdate() {
    if (this.volunteerForm.invalid) {
      this.mensagemService.erro('Please fill in all required fields.');
      return;
    }

    if (this.isRegistering) {
      this.volunteerService.register(this.volunteerForm.value).subscribe(() => {
        this.mensagemService.sucesso('Volunteer successfully registered!');
        this.router.navigate(['/app-volunteer-list']);
      });
    } else {
      this.volunteerService.update(this.volunteerForm.value).subscribe(() => {
        this.mensagemService.sucesso('Volunteer successfully updated!');
        this.router.navigate(['/app-volunteer-list']);
      });
    }
  }
}
