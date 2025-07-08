import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() viewDetails = new EventEmitter<Product>();

  constructor(private cartService: CartService) { }

  onAddToCart(): void {
    this.cartService.addToCart(this.product);
    console.log(`Added ${this.product.name} to cart!`);
  }

  onViewDetailsClick(): void {
    console.log('ProductItemComponent: onViewDetailsClick triggered!');
    this.viewDetails.emit(this.product);
  }
}
