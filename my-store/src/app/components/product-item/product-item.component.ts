import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;

  onAddToCart(): void {
    console.log(`Added ${this.product.name} to cart!`);
  }
}
