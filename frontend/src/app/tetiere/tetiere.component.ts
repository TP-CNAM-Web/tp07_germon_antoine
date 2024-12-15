
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '../cart/cart.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tetiere',
  imports: [CommonModule],
  templateUrl: './tetiere.component.html',
  styleUrl: './tetiere.component.css'
})
export class TetiereComponent implements OnInit {
    itemCount$: Observable<number>;

    constructor(private store: Store) {
        this.itemCount$ = this.store.select(CartState.getCount);
    }
  
    ngOnInit() {
      this.itemCount$ = this.store.select(CartState.getCount);
    }
}