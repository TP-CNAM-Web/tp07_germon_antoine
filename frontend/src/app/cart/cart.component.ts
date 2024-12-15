import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { CartState } from './cart.state';
import { RemoveFromCart } from './cart.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems$: Observable<Produit[]>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(CartState.getItems);
  }

  removeFromCart(produit: Produit) {
    this.store.dispatch(new RemoveFromCart(produit));
  }
}