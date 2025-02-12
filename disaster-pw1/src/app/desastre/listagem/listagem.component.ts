import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Desastre } from '../../shared/model/desastre';
import { DESASTRES } from '../../shared/model/DESASTRES';
import { DesastreRestService } from "../../shared/services/desastre-rest.service";


@Component({
  selector: 'app-listagem',
  standalone: false,
  
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  DESASTRES: Desastre[] = [];

  constructor(private desastreService: DesastreRestService, private roteador: Router) {
  }

  ngOnInit() {
    this.desastreService.listar().subscribe(
        desastres => this.DESASTRES = desastres
    );
  }

  remover(desastreARemover: Desastre) {
    if (desastreARemover.id) {
      this.desastreService.remover(desastreARemover.id).subscribe(
          () => {
            console.log('removido');
            const desastreIndx = this.DESASTRES.findIndex(desastre => desastre.id === desastreARemover.id);
            this.DESASTRES.splice(desastreIndx, 1);
          }
      );
    }
  }

  alterar(desastre: Desastre) {
    this.roteador.navigate([`edicao-desastre`, desastre.id]);
  }

}