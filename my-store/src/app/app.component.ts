import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { CartComponent } from './components/cart/cart.component';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dans Online General Store';
    
    showCartSidebar: boolean = false;
    
    toggleCartSidebar(): void {
    this.showCartSidebar = !this.showCartSidebar;
    console.log('Cart sidebar visibility toggled:', this.showCartSidebar);
  }
}