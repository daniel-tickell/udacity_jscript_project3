import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet
import { HeaderComponent } from './layout/header/header.component';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  //imports: [HeaderComponent, CartComponent, ConfirmationComponent, ProductItemComponent, ProductItemDetailComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-store';
}