import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  environment = environment;
}
