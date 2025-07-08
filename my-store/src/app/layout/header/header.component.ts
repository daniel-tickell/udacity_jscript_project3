import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { LayoutService } from '../../services/layout/layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title: string = "Dans Online General Store"
  cartItemCount$: Observable<number> | undefined;

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private cartService: CartService,
              private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.cartItemCount$ = this.cartService.getCartTotalItems();
  }

  onCartIconClick(): void {
    this.layoutService.toggleCartSidebar();
  }
}