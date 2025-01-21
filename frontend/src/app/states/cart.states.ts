import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, RemoveFromCart } from '../actions/cart.actions';
import { Produit } from '../models/produit';
import { Injectable } from '@angular/core';

export interface CartStateModel {
    items: Produit[];
}

@State<CartStateModel>({
    name: 'cart',
    defaults: {
        items: []
    }
})
@Injectable()
export class CartState {
    @Selector()
    static getItems(state: CartStateModel) {
        return state.items;
    }

    @Selector()
    static getCount(state: CartStateModel) {
        return state.items.length;
    }

    @Action(AddToCart)
    add({ getState, patchState }: StateContext<CartStateModel>, { payload }: AddToCart) {
        const state = getState();
        patchState({
            items: [...state.items, payload]
        });
    }

    @Action(RemoveFromCart)
    remove({ getState, patchState }: StateContext<CartStateModel>, { payload, quantity }: RemoveFromCart) {
        const state = getState();
        const items = [...state.items];
        const index = items.findIndex(item => item.reference === payload.reference);
        if (index !== -1) {
            if (quantity >= items.filter(item => item.reference === payload.reference).length) {
                items.splice(index, 1);
            } else {
                items.splice(index, quantity);
            }
        }
        patchState({
            items
        });
    }
}