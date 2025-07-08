import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItemDetailComponent } from './product-item-detail.component';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

describe('ProductItemDetailComponent', () => {
  let component: ProductItemDetailComponent;
  let fixture: ComponentFixture<ProductItemDetailComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  const dummyProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    url: 'test-url.jpg',
    description: 'A test product description.'
  };

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [
        ProductItemDetailComponent,
        CommonModule 
      ],
      providers: [
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemDetailComponent);
    component = fixture.componentInstance;
    component.product = dummyProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details when product is provided', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(dummyProduct.name);
    expect(compiled.querySelector('img').src).toContain(dummyProduct.url);
    const allpTags = compiled.querySelectorAll('p');
    let priceFound = false;
    let descriptionFound = false;

    allpTags.forEach((p: HTMLParagraphElement) => {
      if (p.textContent?.includes(dummyProduct.price.toFixed(2))) {
        priceFound = true;
      }
      if (p.textContent?.includes(dummyProduct.description.substring(0, 100))) {
        descriptionFound = true;
      }
    });

    expect(priceFound).toBeTrue();
    expect(descriptionFound).toBeTrue();
  });

  it('should call cartService.addToCart when onAddToCart is called with a product', () => {
    component.onAddToCart(dummyProduct);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(dummyProduct);
  });

  it('should not call cartService.addToCart when onAddToCart is called without a product', () => {
    component.onAddToCart(undefined);
    expect(mockCartService.addToCart).not.toHaveBeenCalled();
  });

  it('should emit closeDetails event when onCloseClick is called', () => {
    spyOn(component.closeDetails, 'emit');
    component.onCloseClick();
    expect(component.closeDetails.emit).toHaveBeenCalledTimes(1);
  });

  it('should log a warning if product is undefined on ngOnInit', () => {
    fixture = TestBed.createComponent(ProductItemDetailComponent);
    component = fixture.componentInstance;
    spyOn(console, 'warn');
    fixture.detectChanges();

    expect(console.warn).toHaveBeenCalledWith('Product detail component initialized without a product input.');
  });
});
