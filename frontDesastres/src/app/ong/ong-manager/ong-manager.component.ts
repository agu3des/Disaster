import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { OngFirestoreService } from "../../shared/services/ong-firestore.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-ong-manager',
  standalone: false,
  templateUrl: './ong-manager.component.html',
  styleUrls: ['./ong-manager.component.css']
})
export class OngManagerComponent {
  ongForm: FormGroup;
  actionButtonName: string;
  isRegistering: boolean;

  constructor(
    private fb: FormBuilder,
    private ongService: OngFirestoreService, 
    private mensagemService: MensagemSweetService,
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    this.actionButtonName = 'Register';
    this.isRegistering = true;
    this.ongForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      regiaoAtuacao: ['', Validators.required],
      rede_social: ['', Validators.required],
      cnpj: ['', Validators.required],
      pix: ['', Validators.required],

    });

    const editId = this.activatedRoute.snapshot.paramMap.get('id');
    if (editId) {
      this.actionButtonName = 'Update';
      this.isRegistering = false;
      this.ongService.getById(editId).subscribe(ong => {
        this.ongForm.patchValue(ong);
      });
    }
  }

  registerOrUpdate() {
    if (this.ongForm.invalid) {
      this.mensagemService.erro('Please fill in all required fields.');
      return;
    }

    if (this.isRegistering) {
      this.ongService.register(this.ongForm.value).subscribe(() => {
        this.mensagemService.sucesso('Ong successfully registered!');
        this.router.navigate(['/app-ong-list']);
      });
    } else {
      this.ongService.update(this.ongForm.value).subscribe(() => {
        this.mensagemService.sucesso('Ong successfully updated!');
        this.router.navigate(['/app-ong-list']);
      });
    }
  }
}
