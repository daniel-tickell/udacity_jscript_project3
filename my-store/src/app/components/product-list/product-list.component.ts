import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductItemDetailComponent } from '../product-item-detail/product-item-detail.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductItemComponent,
    ProductItemDetailComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  selectedProduct: Product | undefined;
  showDetailBox: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false;
        console.log('Products loaded:', this.products);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching products:', error);
      }
    });
  }
  onViewDetails(product: Product): void {
    console.log('Product details event received in ProductListComponent for:', product.name);
    this.selectedProduct = product;
    this.showDetailBox = true;
    console.log('showDetailBox is now:', this.showDetailBox);
}
  onCloseDetails(): void {
    this.selectedProduct = undefined;
    this.showDetailBox = false;
    console.log('Hiding product details.');
  }
}