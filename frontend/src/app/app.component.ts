import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TetiereComponent } from './tetiere/tetiere.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TetiereComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'tp03_germon_antoine';
}
