import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesastreRestService } from "../../shared/services/desastre-rest.service";
//import { DesastreFirestoreService } from "../../shared/services/desastre-firestore.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-manutencao',
  standalone: false,
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent {

  desastreForm: FormGroup;
  nomeBotaoAcao: string;
  estahCadastrando: boolean;


  constructor(
    private fb: FormBuilder,
    private desastreService: DesastreRestService, 
    private mensagemService: MensagemSweetService,
    private roteador: Router, 
    private rotaAtivada: ActivatedRoute
  ) {
    this.nomeBotaoAcao = 'Cadastrar';
    this.estahCadastrando = true;
    this.desastreForm = this.fb.group({
      dataDeOcorrencia: ['', Validators.required],
      duracaoDias: ['', Validators.required],
      intensidadeEscala: ['', Validators.required],
      qtdVitimas: ['', Validators.required],
      tipo: ['', Validators.required],
      regiao: [[], Validators.required], 
      imagemUrl: ['']
    });

    const idEdicao = this.rotaAtivada.snapshot.paramMap.get('id');
    if (idEdicao) {
      this.nomeBotaoAcao = 'Atualizar';
      this.estahCadastrando = false;
      this.desastreService.pesquisarPorId(idEdicao).subscribe(
        desastre => this.desastreForm.patchValue(desastre)
      );
    }
  }

  cadastrarOuAtualizar() {
    if (this.desastreForm.invalid) {
      this.mensagemService.erro('Please fill in all required fields.');
      return;
    }
    if (this.estahCadastrando) {
      this.desastreService.cadastrar(this.desastreForm.value).subscribe(() => {
          this.mensagemService.sucesso('Disaster successfully registered!');
          this.roteador.navigate(['/listagem-desastres']);
        });
    } else {
      this.desastreService.atualizar(this.desastreForm.value).subscribe(() => {
          this.mensagemService.sucesso('Disaster successfully updated!');
          this.roteador.navigate(['/listagem-desastres']);
        });
    }
  }

}
