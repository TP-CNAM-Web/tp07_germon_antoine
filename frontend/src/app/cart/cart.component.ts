import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { Produit } from '../models/produit';
import { CartState } from '../states/cart.states';
import { AddToCart, RemoveFromCart } from '../actions/cart.actions';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
    cartItems$: Observable<{ produit: Produit, quantity: number }[]>;

    constructor(private store: Store) {
        this.cartItems$ = this.store.select(CartState.getItems).pipe(
            map(items => {
                const groupedItems: { [ref: string]: { produit: Produit, quantity: number } } = {};
                items.forEach(item => {
                    if (groupedItems[item.ref]) {
                        groupedItems[item.ref].quantity++;
                    } else {
                        groupedItems[item.ref] = { produit: item, quantity: 1 };
                    }
                });
                return Object.values(groupedItems);
            })
        );
    }
  
    addToCart(produit: Produit) {
        this.store.dispatch(new AddToCart(produit));
    }
  
    removeFromCart(produit: Produit) {
        this.store.dispatch(new RemoveFromCart(produit));
    }

    getTotal(cartItems: { produit: Produit, quantity: number }[]): number {
        return cartItems.reduce((total, item) => total + item.produit.prix * item.quantity, 0);
    }
}