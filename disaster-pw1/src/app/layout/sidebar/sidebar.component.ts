import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuOpen: string | null = null;

  toggleMenu(menu: string) {
    this.menuOpen = this.menuOpen === menu ? null : menu;
  }
}
