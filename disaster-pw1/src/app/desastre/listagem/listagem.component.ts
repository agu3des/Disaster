import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Disaster } from '../../shared/model/disaster';
import { DisasterRestService } from "../../shared/services/disaster-rest.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../layout/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-listagem',
  standalone: false,
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  DISASTERS: Disaster[] = [];

  constructor(
    private disasterService: DisasterRestService, 
    private router: Router, 
    private dialog: MatDialog
  ) {}
  
  ngOnInit() {
    this.disasterService.list().subscribe(
        disasters => this.DISASTERS = disasters
    );
  }

  trackDisasterId(index: number, item: any): number {
    return item.id; 
  }

  getDisasterIcon(type: string): string {
    if (!type) {
      return 'warning';
    }

    switch (type.toLowerCase()) {
      case 'flash_flood':
      case 'flood':
        return 'water'; 
      case 'landslide':
        return 'terrain';  
      case 'fire':
        return 'fireplace';  
      case 'drought':
        return 'invert_colors';  
      case 'windstorm':
        return 'storm';  
      case 'hail':
        return 'ac_unit';  
      default:
        return 'warning';  
    }
  }
  
  private get currentUserEmail(): string | null {
    const token = localStorage.getItem('jwt_token');
    
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = atob(payloadBase64); 
      const payloadJson = JSON.parse(payloadDecoded);
      return payloadJson.sub; 
    } catch (e) {
      console.error('Erro ao decodificar o token', e);
      return null;
    }
  }

  isOwner(item: any): boolean {
    const userEmail = this.currentUserEmail;
    return !!(userEmail && item.createdBy && item.createdBy.email === userEmail);
  }

  canEdit(disaster: any): boolean {
    return this.isOwner(disaster);
  }


  confirmRemove(disaster: Disaster) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete this disaster?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(disaster);
      }
    });
  }

  remove(disasterToRemove: Disaster) {
    if (disasterToRemove.id) {
      this.disasterService.remove(disasterToRemove.id).subscribe(
          () => {
            console.log('Successfully removed');
            const disasterIndex = this.DISASTERS.findIndex(d => d.id === disasterToRemove.id);
            if (disasterIndex !== -1) {
              this.DISASTERS.splice(disasterIndex, 1);
            }
          }
      );
    } 
  }

  edit(disaster: Disaster) {
    this.router.navigate([`edicao-desastre`, disaster.id]);
  }

}