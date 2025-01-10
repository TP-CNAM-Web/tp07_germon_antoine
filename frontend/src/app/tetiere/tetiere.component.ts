
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '../states/cart.states';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AuthenticationComponent } from '../authentication/authentication.component';

@Component({
  selector: 'app-tetiere',
  imports: [CommonModule, RouterModule, AuthenticationComponent],
  templateUrl: './tetiere.component.html',
  styleUrl: './tetiere.component.css'
})
export class TetiereComponent implements OnInit {
    itemCount$: Observable<number | null>;

    constructor(private store: Store) {
        this.itemCount$ = this.store.select(CartState.getCount);
    }
  
    ngOnInit() {
      this.itemCount$ = this.store.select(CartState.getCount);
    }

    getItemCount(itemCount: number | null): number {
        return itemCount ?? 0;
    }
}