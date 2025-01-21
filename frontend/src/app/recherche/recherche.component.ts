import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-recherche',
    imports: [FormsModule],
    templateUrl: './recherche.component.html',
    styleUrl: './recherche.component.css'
})
export class RechercheComponent {
    refFiltre: string = '';
    libelleFiltre: string = '';
    prixMaxFiltre: number | null = null;
  
    @Output() filtreChange = new EventEmitter<{ reference: string; libelle: string; prixMax: number | null }>();
  
    mettreAJourFiltre() {
      // Emet les critères de filtrage actuels au composant parent
      this.filtreChange.emit({
        reference: this.refFiltre,
        libelle: this.libelleFiltre,
        prixMax: this.prixMaxFiltre
      });
    }
}
