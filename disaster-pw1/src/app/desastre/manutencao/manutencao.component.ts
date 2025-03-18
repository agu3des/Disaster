import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Desastre } from '../../shared/model/desastre';
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

  desastre: Desastre;
  nomeBotaoAcao: string;
  estahCadastrando: boolean;


  constructor(
    private desastreService: DesastreRestService, 
    private mensagemService: MensagemSweetService,
    private roteador: Router, 
    private rotaAtivada: ActivatedRoute
  ) {
    this.nomeBotaoAcao = 'Cadastrar';
    this.estahCadastrando = true;
    this.desastre = new Desastre();

    const idEdicao = this.rotaAtivada.snapshot.paramMap.get('id');
    if (idEdicao) {
      this.nomeBotaoAcao = 'Atualizar';
      this.estahCadastrando = false;
      this.desastreService.pesquisarPorId(idEdicao).subscribe(
        desastrePesquisado => this.desastre = desastrePesquisado
      );
    }
  }

  cadastrarOuAtualizar() {
    if (this.estahCadastrando) {
      this.desastreService.cadastrar(this.desastre).subscribe(
        desastreCadastrado => {
          this.mensagemService.sucesso('Desastre cadastrado com sucesso!');
          this.roteador.navigate(['/listagem-desastres']);
        }
      );
    } else {
      this.desastreService.atualizar(this.desastre).subscribe(
        desastreAtualizado => {
          this.mensagemService.sucesso('Desastre atualizado com sucesso!');
          this.roteador.navigate(['/listagem-desastres']);
        }
      );
    }
  }

}
