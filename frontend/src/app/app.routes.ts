import { Routes } from '@angular/router';
import { BoutiqueComponent } from './boutique/boutique.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {path : 'boutique', component : BoutiqueComponent},
    {path : 'cart', component : CartComponent},
    {path : '**', component : BoutiqueComponent}
];