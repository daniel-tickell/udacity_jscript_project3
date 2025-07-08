import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _showCartSidebar = new BehaviorSubject<boolean>(false);
  public showCartSidebar$: Observable<boolean> = this._showCartSidebar.asObservable();

  constructor() { }

  toggleCartSidebar(): void {
    const currentValue = this._showCartSidebar.getValue();
    this._showCartSidebar.next(!currentValue);
  }

  showCartSidebar(): void {
    this._showCartSidebar.next(true);
  }

  hideCartSidebar(): void {
    this._showCartSidebar.next(false);
  }
}
