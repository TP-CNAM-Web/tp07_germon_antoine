import { Routes } from '@angular/router';
import { BoutiqueComponent } from './boutique/boutique.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    {path : 'boutique', component : BoutiqueComponent},
    {path : 'cart', component : CartComponent},
    { path: 'account', component: AccountComponent },
    {path: '**', redirectTo: 'boutique'}
];