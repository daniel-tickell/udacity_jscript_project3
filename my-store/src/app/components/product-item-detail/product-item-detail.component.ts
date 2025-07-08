import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css'
})
export class ProductItemDetailComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() closeDetails = new EventEmitter<void>();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    if (!this.product) {
      console.warn('Product detail component initialized without a product input.');
      this.closeDetails.emit();
    }
  }

  onAddToCart(product: Product | undefined): void {
    if (product) {
      this.cartService.addToCart(product);
      console.log(`Added ${product.name} to cart from detail box.`);
      alert(`${product.name} added to cart!`);
    }
  }

  onCloseClick(): void {
    this.closeDetails.emit();
  }
}
