import { Component, Input } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SelectComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
}
