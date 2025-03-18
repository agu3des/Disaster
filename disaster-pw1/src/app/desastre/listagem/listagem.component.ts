import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Desastre } from '../../shared/model/desastre';
import { DESASTRES } from '../../shared/model/DESASTRES';
import { DesastreRestService } from "../../shared/services/desastre-rest.service";
//import { DesastreFirestoreService } from "../../shared/services/desastre-firestore.service";



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

  trackDesastreId(index: number, item: any): number {
    return item.id; 
  }

  getDisasterIcon(tipo: string): string {
    switch (tipo.toLowerCase()) {
      case 'enxurrada':
        return 'water'; 
      case 'deslizamento':
        return 'terrain';  
      case 'incendio':
        return 'fireplace';  
      case 'seca':
        return 'invert_colors';  
      case 'inundacao':
        return 'waves';  
      case 'vendaval':
        return 'storm';  
      case 'granizo':
        return 'ac_unit';  
      default:
        return 'warning';  
    }
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