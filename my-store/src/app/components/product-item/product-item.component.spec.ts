import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItemComponent } from './product-item.component';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../models/product.model';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  // Dummy product data for testing
  const dummyProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 10.00,
    url: 'test-image.jpg',
    description: 'This is a test product description.'
  };

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [
        ProductItemComponent,
        CommonModule,
        MatCardModule
      ],
      providers: [
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = dummyProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(dummyProduct.name);
    expect(compiled.querySelector('img').src).toContain(dummyProduct.url);
    expect(compiled.querySelector('img').alt).toContain(dummyProduct.name);
    expect(compiled.querySelector('p.text-gray-700').textContent).toContain(dummyProduct.price.toFixed(2));
    expect(compiled.querySelector('p.text-gray-500').textContent).toContain(dummyProduct.description.substring(0, 100));
  });

  it('should call cartService.addToCart when "Add to Cart" button is clicked', () => {
    spyOn(console, 'log');
    const addToCartButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-primary-add');
    addToCartButton.click();
    expect(mockCartService.addToCart).toHaveBeenCalledWith(dummyProduct);
    expect(console.log).toHaveBeenCalledWith(`Added ${dummyProduct.name} to cart!`);
  });

  it('should emit viewDetails event with product when "View Details" button is clicked', () => {
    spyOn(component.viewDetails, 'emit');
    spyOn(console, 'log');
    const viewDetailsButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-primary-details');
    viewDetailsButton.click();
    expect(component.viewDetails.emit).toHaveBeenCalledWith(dummyProduct);
    expect(console.log).toHaveBeenCalledWith('ProductItemComponent: onViewDetailsClick triggered!');
  });

  it('should emit viewDetails event with product when image is clicked', () => {
    spyOn(component.viewDetails, 'emit');
    spyOn(console, 'log');
    const productImage: HTMLImageElement = fixture.nativeElement.querySelector('img.product-image');
    productImage.click();
    expect(component.viewDetails.emit).toHaveBeenCalledWith(dummyProduct);
    expect(console.log).toHaveBeenCalledWith('ProductItemComponent: onViewDetailsClick triggered!');
  });
});
