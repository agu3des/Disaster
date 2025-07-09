import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { Ong } from '../../shared/model/ong';
import { OngFirestoreService } from "../../shared/services/ong-firestore.service";
import { ConfirmationDialogComponent } from '../../layout/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ong-list',
  standalone: false,
  templateUrl: './ong-list.component.html',
  styleUrls: ['./ong-list.component.css']
})
export class OngListComponent implements OnInit {
  ONGS: Ong[] = [];

  constructor(
    private ongService: OngFirestoreService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ongService.list().subscribe(
      ongs => this.ONGS = ongs
    );
  }

  trackOngId(index: number, ong: any): number {
    return ong.id;  
  }
  
  getOngIcon(ong: any): string {
    return ong.name ? 'person' : 'account_circle';
  }

  confirmRemove(ong: Ong) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${ong.nome}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(ong);
      }
    });
  }

  remove(ongToRemove: Ong) {
    if (ongToRemove.id) {
      this.ongService.remove(ongToRemove.id).subscribe(() => {
        this.ONGS = this.ONGS.filter(v => v.id !== ongToRemove.id);
      });
    }
  }

  edit(ong: Ong) {
    this.router.navigate([`edit-ong`, ong.id]);
  }




  testimonials = [
    {
      text: '"This NGO helped me get access to education when I had no other options. I\'m forever grateful!"',
      author: '- John Doe'
    },
    {
      text: '"Thanks to their support, I can now feed my family and improve our living conditions."',
      author: '- Jane Smith'
    },
    {
      text: '"The work they do in underprivileged communities is truly inspiring. A great cause!"',
      author: '- Mark Johnson'
    }
  ];




}
