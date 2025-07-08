import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmationComponent } from './confirmation.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

describe('ConfirmationComponent (Template-Driven)', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let form: NgForm;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCartService = jasmine.createSpyObj('CartService', ['clearCart']);

    await TestBed.configureTestingModule({
      imports: [
        ConfirmationComponent,
        FormsModule,
        CommonModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const formDebugElement = fixture.debugElement.query(By.directive(NgForm));
    form = formDebugElement.injector.get(NgForm);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields as empty strings', () => {
    expect(component.fullName).toBe('');
    expect(component.address).toBe('');
    expect(component.city).toBe('');
    expect(component.state).toBe('');
    expect(component.zipCode).toBe('');
    expect(component.email).toBe('');
  });

  it('should mark form as invalid initially', () => {
    expect(form.invalid).toBeTrue();
    expect(form.controls['fullName'].invalid).toBeTrue();
    expect(form.controls['email'].invalid).toBeTrue();
  });

  it('should display required errors when fields are touched and invalid', fakeAsync(() => {
    const fullNameInput: HTMLInputElement = fixture.nativeElement.querySelector('#fullName');

    fullNameInput.value = '';
    fullNameInput.dispatchEvent(new Event('input'));
    fullNameInput.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();

    expect(form.controls['fullName'].invalid).toBeTrue();
    expect(form.controls['fullName'].touched).toBeTrue();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain('Full Name is required.');
  }));

  it('should clear cart, hide sidebar, show alert, and navigate on valid submission', fakeAsync(() => {
    spyOn(window, 'alert');

    const fullNameInput: HTMLInputElement = fixture.nativeElement.querySelector('#fullName');
    fullNameInput.value = 'John Doe';
    fullNameInput.dispatchEvent(new Event('input'));
    fullNameInput.dispatchEvent(new Event('blur'));

    const addressInput: HTMLInputElement = fixture.nativeElement.querySelector('#address');
    addressInput.value = '123 Main St';
    addressInput.dispatchEvent(new Event('input'));
    addressInput.dispatchEvent(new Event('blur'));

    const cityInput: HTMLInputElement = fixture.nativeElement.querySelector('#city');
    cityInput.value = 'Anytown';
    cityInput.dispatchEvent(new Event('input'));
    cityInput.dispatchEvent(new Event('blur'));

    const stateInput: HTMLInputElement = fixture.nativeElement.querySelector('#state');
    stateInput.value = 'CA';
    stateInput.dispatchEvent(new Event('input'));
    stateInput.dispatchEvent(new Event('blur'));
    tick(100);

    const zipCodeInput: HTMLInputElement = fixture.nativeElement.querySelector('#zipCode');
    zipCodeInput.value = '90210';
    zipCodeInput.dispatchEvent(new Event('input'));
    zipCodeInput.dispatchEvent(new Event('blur'));
    tick(100);

    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'john.doe@example.com';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));

    tick(100);
    fixture.detectChanges();

    expect(form.valid).toBeTrue();

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    tick();

    expect(mockCartService.clearCart).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
    expect(window.alert).toHaveBeenCalledWith('Order Placed Successfully!');
  }));

  it('should show validation error for invalid email', fakeAsync(() => {
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();

    expect(form.controls['email'].errors?.['email']).toBeTrue();
    expect(form.controls['email'].invalid).toBeTrue();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain('Please enter a valid email address.');
  }));

  it('should show validation error for invalid state pattern (e.g., numbers)', fakeAsync(() => {
    const stateInput: HTMLInputElement = fixture.nativeElement.querySelector('#state');
    stateInput.value = '12'
    stateInput.dispatchEvent(new Event('input'));
    stateInput.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();

    expect(form.controls['state'].errors?.['pattern']).toBeTruthy();
    expect(form.controls['state'].invalid).toBeTrue();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain('State must be two capital letters (e.g., NY).');
  }));

  it('should show validation error for invalid state length (too long)', fakeAsync(() => {
    const stateInput: HTMLInputElement = fixture.nativeElement.querySelector('#state');
    stateInput.value = 'CAAA';
    stateInput.dispatchEvent(new Event('input'));
    stateInput.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();

    expect(form.controls['state'].errors?.['maxlength']).toBeTruthy();
    expect(form.controls['state'].invalid).toBeTrue();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain('State must be 2 characters.');
  }));

  it('should show validation error for invalid zip code pattern', fakeAsync(() => {
    const zipCodeInput: HTMLInputElement = fixture.nativeElement.querySelector('#zipCode');
    zipCodeInput.value = '123';
    zipCodeInput.dispatchEvent(new Event('input'));
    zipCodeInput.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();

    expect(form.controls['zipCode'].errors?.['pattern']).toBeTruthy();
    expect(form.controls['zipCode'].invalid).toBeTrue();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain('Invalid Zip Code format (e.g., 12345 or 12345-6789).');
  }));
});