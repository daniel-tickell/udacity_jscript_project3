import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  cartTotalItems$: Observable<number> | undefined;
  cartTotalPrice$: Observable<number> | undefined;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cart$;
    this.cartTotalItems$ = this.cartService.getCartTotalItems();
    this.cartTotalPrice$ = this.cartService.getCartTotalPrice();
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.id, item.quantity - 1);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  placeOrder(): void {
    this.router.navigate(['/confirmation']);
  }
}
