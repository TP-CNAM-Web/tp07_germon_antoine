import { Routes } from '@angular/router';
import { BoutiqueComponent } from './boutique/boutique.component';

export const routes: Routes = [
    {path : 'boutique', component : BoutiqueComponent},
    {path : '**', component : BoutiqueComponent}
];