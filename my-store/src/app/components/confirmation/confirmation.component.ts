import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  fullName: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  email: string = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private layoutService: LayoutService
  ) { }


  ngOnInit(): void {  }

  validateZip(): void {
    console.log('Validating Zip Code (triggered by ngModelChange):', this.zipCode);
  }

  validateState(): void {
    console.log('Validating State (triggered by ngModelChange):', this.state);
  }

  onSubmit(form: any): void {
  if (form.valid) {
      const orderDetails = {
        fullName: this.fullName,
        address: this.address,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        email: this.email
      };
      console.log('Order Details Submitted:', orderDetails);
      this.cartService.clearCart();
      this.layoutService.hideCartSidebar();
      alert('Order Placed Successfully!');
      this.router.navigate(['/products']);
    } else {
      alert('Form Inputs have some issues please correct!'); 
      console.log('Form is invalid. Please check the inputs.');
    }
  }
}
