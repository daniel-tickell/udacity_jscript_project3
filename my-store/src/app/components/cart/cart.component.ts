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
    alert(`${item.name} quantity increased to ${item.quantity}`);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.id, item.quantity - 1);
    alert(`${item.name} quantity decreased to ${item.quantity}`);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
    alert(`${item.name} removed from Cart`);
  }

  clearCart(): void {
    this.cartService.clearCart();
    alert(`All Items removed from Cart`);
  }

  placeOrder(): void {
    this.router.navigate(['/confirmation']);
  }
}
