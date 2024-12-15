import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, RemoveFromCart } from './cart.actions';
import { Produit } from '../models/produit';

export interface CartStateModel {
  items: Produit[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: []
  }
})
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
  remove({ getState, patchState }: StateContext<CartStateModel>, { payload }: RemoveFromCart) {
    patchState({
      items: getState().items.filter(item => item.ref !== payload.ref)
    });
  }
}