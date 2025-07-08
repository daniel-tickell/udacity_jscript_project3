import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _showCartSidebar = new BehaviorSubject<boolean>(true);
  public showCartSidebar$: Observable<boolean> = this._showCartSidebar.asObservable();

  constructor() { }

  toggleCartSidebar(): void {
    this._showCartSidebar.next(!this._showCartSidebar.getValue());
  }

  showCartSidebar(): void {
    this._showCartSidebar.next(true);
  }

  hideCartSidebar(): void {
    this._showCartSidebar.next(false);
  }
}
