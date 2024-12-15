import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoutiqueComponent } from './boutique/boutique.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoutiqueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp03_germon_antoine';
}
