import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product/product.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductItemDetailComponent } from '../product-item-detail/product-item-detail.component';
import { Product } from '../../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  // Dummy product data for testing
  const dummyProducts: Product[] = [
    { id: 1, name: 'Test Book', price: 10, url: 'test-url-1', description: 'Test desc 1' },
    { id: 2, name: 'Test Headphones', price: 20, url: 'test-url-2', description: 'Test desc 2' },
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        CommonModule,
        ProductItemComponent,
        ProductItemDetailComponent
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    mockProductService.getProducts.and.returnValue(of(dummyProducts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on ngOnInit', () => {
    expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
    expect(component.products).toEqual(dummyProducts);
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error when loading products', () => {
    const errorMessage = 'Failed to fetch products';
    component.products = [];
    component.isLoading = true;
    mockProductService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('Failed to load products. Please try again later.');
    expect(component.products).toEqual([]);
  });

  it('should set selectedProduct and showDetailBox to true when onViewDetails is called', () => {
    const productToView = dummyProducts[0];
    component.onViewDetails(productToView);

    expect(component.selectedProduct).toEqual(productToView);
    expect(component.showDetailBox).toBeTrue();
  });

  it('should clear selectedProduct and hideDetailBox when onCloseDetails is called', () => {
    component.selectedProduct = dummyProducts[0];
    component.showDetailBox = true;

    component.onCloseDetails();

    expect(component.selectedProduct).toBeUndefined();
    expect(component.showDetailBox).toBeFalse();
  });

  it('should render product items when products are loaded', () => {
    const compiled = fixture.nativeElement;
    const productItems = compiled.querySelectorAll('app-product-item');
    expect(productItems.length).toEqual(dummyProducts.length);
  });

  it('should show detail box when showDetailBox is true and selectedProduct is defined', () => {
    component.onViewDetails(dummyProducts[0]);
    fixture.detectChanges();

    const detailBox = fixture.nativeElement.querySelector('app-product-item-detail');
    expect(detailBox).toBeTruthy();
  });

  it('should hide detail box when onCloseDetails is called', () => {
    component.onViewDetails(dummyProducts[0]);
    fixture.detectChanges();
    component.onCloseDetails();
    fixture.detectChanges();
    const detailBox = fixture.nativeElement.querySelector('app-product-item-detail');
    expect(detailBox).toBeNull();
  });
});
