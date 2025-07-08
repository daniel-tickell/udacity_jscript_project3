import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.orderForm.controls; }

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Order Details Submitted:', this.orderForm.value);
      alert('Order Placed Successfully!');
      this.cartService.clearCart();
      this.router.navigate(['/products']);
    } else {
      this.orderForm.markAllAsTouched();
      console.log('Form is invalid. Please check the inputs.');
    }
  }
}
