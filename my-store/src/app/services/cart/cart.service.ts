import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';

  private cartSubject = new BehaviorSubject<CartItem[]>(this.getCartFromLocalStorage());
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor() { }

  private getCartFromLocalStorage(): CartItem[] {
    try {
      const cartJson = localStorage.getItem(this.CART_STORAGE_KEY);
      return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
      console.error('Error parsing cart from Local Storage:', e);
      return [];
    }
  }

  private saveCartToLocalStorage(cart: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to Local Storage:', e);
    }
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
    console.log('Product added to cart:', product.name, 'Current cart:', currentCart);
  }

  removeFromCart(productId: number): void {
    let currentCart = this.cartSubject.getValue();
    currentCart = currentCart.filter(item => item.id !== productId);

    this.cartSubject.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
    console.log('Product removed from cart. Current cart:', currentCart);
  }

  updateItemQuantity(productId: number, newQuantity: number): void {
    const currentCart = this.cartSubject.getValue();
    const itemToUpdate = currentCart.find(item => item.id === productId);

    if (itemToUpdate) {
      if (newQuantity <= 0) {
        this.removeFromCart(productId);
      } else {
        itemToUpdate.quantity = newQuantity;
        this.cartSubject.next(currentCart);
        this.saveCartToLocalStorage(currentCart);
        console.log(`Quantity of ${itemToUpdate.name} updated to ${newQuantity}. Current cart:`, currentCart);
      }
    }
  }

  getCart(): CartItem[] {
    return this.cartSubject.getValue();
  }
  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToLocalStorage([]);
    console.log('Cart cleared.');
  }

  getCartTotalItems(): Observable<number> {
    return this.cart$.pipe(
      map((cartItems: CartItem[]) =>
        cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0)
      )
    );
  }

  getCartTotalPrice(): Observable<number> {
    return this.cart$.pipe(
      map((cartItems: CartItem[]) =>
        cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
      )
    );
  }
}