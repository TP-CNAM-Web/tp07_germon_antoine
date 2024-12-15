import { Component, Input } from '@angular/core';
import { Produit } from '../models/produit';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddToCart } from '../cart/cart.actions';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})
export class ProduitListComponent {
    @Input() produits: Produit[] = [];

    constructor(private store: Store) {}

    addToCart(produit: Produit) {
        this.store.dispatch(new AddToCart(produit));
    }
}
