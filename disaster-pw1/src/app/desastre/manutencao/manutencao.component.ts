import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Desastre } from '../../shared/model/desastre';
import { DesastreRestService } from "../../shared/services/desastre-rest.service";
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

  // Variável para controlar o progresso
  progresso: number = 0;

  constructor(
    private desastreService: DesastreRestService, 
    private mensagemService: MensagemSweetService,
    private roteador: Router, 
    private rotaAtivada: ActivatedRoute
  ) {
    this.nomeBotaoAcao = 'Cadastrar';
    this.estahCadastrando = true;
    this.desastre = new Desastre();

    const idEdicao = this.rotaAtivada.snapshot.params['id'];
    if (idEdicao) {
      this.nomeBotaoAcao = 'Atualizar';
      this.estahCadastrando = false;
      this.desastreService.pesquisarPorId(idEdicao).subscribe(
        desastrePesquisado => this.desastre = desastrePesquisado
      );
    }
  }

  // Função para calcular o progresso da barra com base nos campos preenchidos
  calcularProgresso() {
    // Contando os campos preenchidos
    const camposPreenchidos = [
      this.desastre.dataDeOcorrencia,
      this.desastre.duracaoDias,
      this.desastre.intensidadeEscala,
      this.desastre.qtdVitimas,
      this.desastre.tipo,
      this.desastre.regiao
    ].filter(value => value !== null && value !== undefined && value !== '').length;

    // Total de campos
    const totalCampos = 6;

    // Calculando o progresso
    this.progresso = (camposPreenchidos / totalCampos) * 100;
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

  // Método que será chamado sempre que o valor de qualquer campo for alterado
  onModelChange() {
    this.calcularProgresso();
  }
}
