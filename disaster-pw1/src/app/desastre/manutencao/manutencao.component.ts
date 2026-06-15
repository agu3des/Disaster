import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisasterRestService } from "../../shared/services/disaster-rest.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-manutencao',
  standalone: false,
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent {

  disasterForm: FormGroup;
  actionButtonName: string;
  isRegistering: boolean;

  constructor(
    private fb: FormBuilder,
    private disasterService: DisasterRestService, 
    private messageService: MensagemSweetService,
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.actionButtonName = 'Register';
    this.isRegistering = true;
    
    this.disasterForm = this.fb.group({
      id: [null],
      occurrenceDate: ['', Validators.required],
      durationDays: ['', Validators.required],
      intensityScale: ['', Validators.required],
      victimCount: ['', Validators.required],
      type: ['', Validators.required],
      regions: [[], Validators.required], 
      imageUrl: ['']
    });

    const editId = this.route.snapshot.paramMap.get('id');
    if (editId) {
      this.actionButtonName = 'Update';
      this.isRegistering = false;
      this.disasterService.findById(editId).subscribe(
        disaster => this.disasterForm.patchValue(disaster)
      );
    }
  }

  registerOrUpdate() {
    if (this.disasterForm.invalid) {
      this.messageService.erro('Please fill in all required fields.');
      return;
    }
    
    if (this.isRegistering) {
      this.disasterService.register(this.disasterForm.value).subscribe(() => {
          this.messageService.sucesso('Disaster successfully registered!');
          this.router.navigate(['/listagem-desastres']);
        });
    } else {
      this.disasterService.update(this.disasterForm.value).subscribe(() => {
          this.messageService.sucesso('Disaster successfully updated!');
          this.router.navigate(['/listagem-desastres']);
        });
    }
  }
}