import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerManagerComponent } from './volunteer-manager/volunteer-manager.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';



@NgModule({
  declarations: [
    VolunteerManagerComponent,
    VolunteerListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VolunteerManagerComponent,
    VolunteerListComponent
  ]
})
export class VolunteerModule { }
