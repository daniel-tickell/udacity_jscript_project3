import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockRouter: jasmine.SpyObj<Router>;

  // Dummy product data for testing
  const dummyProduct1: Product = { id: 1, name: 'Product A', price: 10, url: 'url1', description: 'Desc A' };
  const dummyProduct2: Product = { id: 2, name: 'Product B', price: 20, url: 'url2', description: 'Desc B' };

  // Dummy cart items for testing
  const dummyCartItems: CartItem[] = [
    { ...dummyProduct1, quantity: 2 },
    { ...dummyProduct2, quantity: 1 }
  ];

  let cartItemsSubject: BehaviorSubject<CartItem[]>;
  let cartTotalItemsSubject: BehaviorSubject<number>;
  let cartTotalPriceSubject: BehaviorSubject<number>;

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', [
      'addToCart',
      'removeFromCart',
      'updateItemQuantity',
      'clearCart',
      'getCartTotalItems',
      'getCartTotalPrice'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartTotalItemsSubject = new BehaviorSubject<number>(0);
    cartTotalPriceSubject = new BehaviorSubject<number>(0);

    mockCartService.cart$ = cartItemsSubject.asObservable();
    mockCartService.getCartTotalItems.and.returnValue(cartTotalItemsSubject.asObservable());
    mockCartService.getCartTotalPrice.and.returnValue(cartTotalPriceSubject.asObservable());

    await TestBed.configureTestingModule({
      imports: [
        CartComponent,
        CommonModule
      ],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to cart items, total items, and total price on ngOnInit', () => {
    expect(component.cartItems$).toBeDefined();
    expect(component.cartTotalItems$).toBeDefined();
    expect(component.cartTotalPrice$).toBeDefined();
  });

  it('should display empty cart message when cart is empty', () => {
    cartItemsSubject.next([]);
    cartTotalItemsSubject.next(0);
    cartTotalPriceSubject.next(0);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-center.text-lg.text-gray-600').textContent).toContain('Your cart is empty.');
    expect(compiled.querySelector('.card')).toBeNull();
  });

  it('should display cart items when cart is not empty', () => {
    cartItemsSubject.next(dummyCartItems);
    cartTotalItemsSubject.next(3);
    cartTotalPriceSubject.next(40);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.flex.items-center.space-x-4').length).toEqual(dummyCartItems.length);
    expect(compiled.querySelector('h3').textContent).toContain(dummyProduct1.name);
    expect(compiled.querySelector('.text-2xl.font-bold.text-primary-color').textContent).toContain('Total Price: $40.00');
  });

  it('should call cartService.increaseQuantity when increase button is clicked', () => {
    cartItemsSubject.next(dummyCartItems);
    fixture.detectChanges();

    const firstCartItem = fixture.nativeElement.querySelectorAll('.flex.items-center.space-x-4')[0];
    const increaseButton: HTMLButtonElement = firstCartItem.querySelector('.btn-secondary-add');
    expect(increaseButton).toBeTruthy('Increase button not found');
    increaseButton.click();

    expect(mockCartService.updateItemQuantity).toHaveBeenCalledWith(dummyCartItems[0].id, dummyCartItems[0].quantity + 1);
  });

  it('should call cartService.decreaseQuantity when decrease button is clicked', () => {
    cartItemsSubject.next(dummyCartItems);
    fixture.detectChanges();

    const firstCartItem = fixture.nativeElement.querySelectorAll('.flex.items-center.space-x-4')[0];
    const decreaseButton: HTMLButtonElement = firstCartItem.querySelector('.btn-outline');
    expect(decreaseButton).toBeTruthy('Decrease button not found');
    decreaseButton.click();

    expect(mockCartService.updateItemQuantity).toHaveBeenCalledWith(dummyCartItems[0].id, dummyCartItems[0].quantity - 1);
  });

  it('should call cartService.removeFromCart when remove button is clicked', () => {
    cartItemsSubject.next(dummyCartItems);
    fixture.detectChanges();

    const firstCartItem = fixture.nativeElement.querySelectorAll('.flex.items-center.space-x-4')[0];
    const removeButton: HTMLButtonElement = firstCartItem.querySelector('.btn-secondary-rem');
    expect(removeButton).toBeTruthy('Remove button not found');
    removeButton.click();

    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(dummyCartItems[0].id);
  });

  it('should call cartService.clearCart when "Clear Cart" button is clicked', () => {
    cartItemsSubject.next(dummyCartItems);
    fixture.detectChanges();

    const clearCartButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-primary-clear');
    expect(clearCartButton).toBeTruthy('Clear Cart button not found');
    clearCartButton.click();

    expect(mockCartService.clearCart).toHaveBeenCalledTimes(1);
  });

  it('should call cartService.clearCart and router.navigate when "Place Order" button is clicked', () => {
    cartItemsSubject.next(dummyCartItems);
    fixture.detectChanges();

    const placeOrderButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-primary-order');
    expect(placeOrderButton).toBeTruthy('Place Order button not found');
    placeOrderButton.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/confirmation']);
  });
});