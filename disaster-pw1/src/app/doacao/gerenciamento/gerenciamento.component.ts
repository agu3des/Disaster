import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Doacao } from '../../shared/model/doacao';
//import { DoacaoRestService } from "../../shared/services/doacao-rest.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-gerenciamento',
  standalone: false,
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.css']
})
export class GerenciamentoComponent {

  doacao: Doacao;
  nomeBotaoAcao: string;
  estahCadastrando: boolean;

  // Variável para controlar o progresso
  progresso: number = 0;

  // Lista de doacaos para listagem
  DOACOES: Doacao[] = [];

  constructor(
    private doacaoService: DoacaoRestService,
    private mensagemService: MensagemSweetService,
    private roteador: Router,
    private rotaAtivada: ActivatedRoute
  ) {
    this.nomeBotaoAcao = 'Cadastrar';
    this.estahCadastrando = true;
    this.doacao = new Doacao();

    // Verifica se há um ID para edição
    const idEdicao = this.rotaAtivada.snapshot.params['id'];
    if (idEdicao) {
      this.nomeBotaoAcao = 'Atualizar';
      this.estahCadastrando = false;
      this.doacaoService.pesquisarPorId(idEdicao).subscribe(
        doacaoPesquisado => this.doacao = doacaoPesquisado
      );
    }
  }

  // Função para calcular o progresso da barra com base nos campos preenchidos
  calcularProgresso() {
    // Contando os campos preenchidos
    const camposPreenchidos = [
      this.doacao.dataDeOcorrencia,
      this.doacao.duracaoDias,
      this.doacao.intensidadeEscala,
      this.doacao.qtdVitimas,
      this.doacao.tipo,
      this.doacao.regiao
    ].filter(value => value !== null && value !== undefined && value !== '').length;

    // Total de campos
    const totalCampos = 6;

    // Calculando o progresso
    this.progresso = (camposPreenchidos / totalCampos) * 100;
  }

  // Método chamado para cadastrar ou atualizar o doacao
  cadastrarOuAtualizar() {
    if (this.estahCadastrando) {
      this.doacaoService.cadastrar(this.doacao).subscribe(
        doacaoCadastrado => {
          this.mensagemService.sucesso('Doacao cadastrado com sucesso!');
          this.roteador.navigate(['/listagem-doacaos']);
        }
      );
    } else {
      this.doacaoService.atualizar(this.doacao).subscribe(
        doacaoAtualizado => {
          this.mensagemService.sucesso('Doacao atualizado com sucesso!');
          this.roteador.navigate(['/listagem-doacaos']);
        }
      );
    }
  }

  // Método que será chamado sempre que o valor de qualquer campo for alterado
  onModelChange() {
    this.calcularProgresso();
  }

  // Método para listar os doacaos
  ngOnInit() {
    this.doacaoService.listar().subscribe(
      doacoes => this.DOACOES = doacoes
    );
  }

  // Método para remover um doacao
  remover(doacaoARemover: Doacao) {
    if (doacaoARemover.id) {
      this.doacaoService.remover(doacaoARemover.id).subscribe(
        () => {
          console.log('Doacao removido');
          const doacaoIndx = this.DOACOES.findIndex(doacao => doacao.id === doacaoARemover.id);
          this.DOACOES.splice(doacaoIndx, 1);
        }
      );
    }
  }

  // Método para alterar um doacao (navegar para o formulário de manutenção)
  alterar(doacao: Doacao) {
    this.roteador.navigate([`gerenciamento-doacao`, doacao.id]);
  }
}
