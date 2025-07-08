import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './confirmation.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;
  let mockFormBuilder: FormBuilder;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCartService = jasmine.createSpyObj('CartService', ['clearCart']);
    mockFormBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [
        ConfirmationComponent,
        ReactiveFormsModule,
        CommonModule
      ],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the order form with required fields and validators', () => {
    expect(component.orderForm).toBeDefined();
    expect(component.orderForm.contains('fullName')).toBeTrue();
    expect(component.orderForm.contains('address')).toBeTrue();
    expect(component.orderForm.contains('city')).toBeTrue();
    expect(component.orderForm.contains('state')).toBeTrue();
    expect(component.orderForm.contains('zipCode')).toBeTrue();
    expect(component.orderForm.contains('email')).toBeTrue();

    expect(component.orderForm.get('fullName')?.valid).toBeFalse();
    expect(component.orderForm.get('email')?.valid).toBeFalse();
    expect(component.orderForm.valid).toBeFalse();
  });

  it('should mark all fields as touched and not submit if form is invalid', () => {
    spyOn(component.orderForm, 'markAllAsTouched');
    spyOn(window, 'alert');

    component.onSubmit();

    expect(component.orderForm.markAllAsTouched).toHaveBeenCalledTimes(1);
    expect(mockCartService.clearCart).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should clear cart, show alert, and navigate to products on valid submission', () => {
    spyOn(window, 'alert');

    component.orderForm.setValue({
      fullName: 'This Guy',
      address: '123 Street St',
      city: 'Sometown',
      state: 'CA',
      zipCode: '94444',
      email: 'this.guy@here.com'
    });

    expect(component.orderForm.valid).toBeTrue(); // Confirm form is valid

    component.onSubmit();

    expect(mockCartService.clearCart).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Order Placed Successfully!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should show validation error for invalid email', () => {
    component.orderForm.setValue({
      fullName: 'This Guy',
      address: '123 Street St',
      city: 'Sometown',
      state: 'CA',
      zipCode: '94444',
      email: 'invalid-email'
    });
    expect(component.orderForm.get('email')?.errors?.['email']).toBeTrue();
    expect(component.orderForm.valid).toBeFalse();
  });

  it('should show validation error for invalid state length', () => {
    component.orderForm.setValue({
      fullName: 'This Guy',
      address: '123 Street St',
      city: 'Sometown',
      state: 'CALI',
      zipCode: '94444',
      email: 'this.guy@here.com'
    });
    expect(component.orderForm.get('state')?.errors?.['maxlength']).toBeTruthy();
    expect(component.orderForm.valid).toBeFalse();
  });

  it('should show validation error for invalid zip code pattern', () => {
    component.orderForm.setValue({
      fullName: 'This Guy',
      address: '123 Street St',
      city: 'Sometown',
      state: 'CA',
      zipCode: '1359',
      email: 'this.guy@here.com'
    });
    expect(component.orderForm.get('zipCode')?.errors?.['pattern']).toBeTruthy();
    expect(component.orderForm.valid).toBeFalse();
  });
});
