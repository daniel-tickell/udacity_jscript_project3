import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORT CommonModule here!
import { CartService } from '../../services/cart/cart.service'; // Assuming this path is correct
import { CartItem } from '../../models/cart-item.model'; // Assuming this path is correct
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule // <--- ADD CommonModule to the imports array
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  cartTotalItems$: Observable<number> | undefined;
  cartTotalPrice$: Observable<number> | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cart$; // Get the observable for cart items
    this.cartTotalItems$ = this.cartService.getCartTotalItems();
    this.cartTotalPrice$ = this.cartService.getCartTotalPrice();
  }

  // Example methods for cart interaction (to be implemented in template)
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
}
