import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutService } from './services/layout/layout.service';
import { CartComponent } from './components/cart/cart.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Dans Online General Store';
  
  showCartSidebar: boolean = false;
  private layoutSubscription!: Subscription;

  constructor(private layoutService: LayoutService) { }
  ngOnInit(): void {
    this.layoutSubscription = this.layoutService.showCartSidebar$.subscribe(
      isVisible => {
        this.showCartSidebar = isVisible;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.layoutSubscription) {
      this.layoutSubscription.unsubscribe();
    }
  }
}