import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() title!: string;        
  @Input() icon!: string;         
  @Input() routes!: { path: string, label: string, icon: string }[];
}
