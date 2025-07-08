import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { LayoutService } from './services/layout/layout.service';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockLayoutService: jasmine.SpyObj<LayoutService>;
  let showCartSidebarSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    showCartSidebarSubject = new BehaviorSubject<boolean>(false);

    mockLayoutService = jasmine.createSpyObj('LayoutService', [
      'toggleCartSidebar',
      'showCartSidebar',
      'hideCartSidebar'
    ]);
    mockLayoutService.showCartSidebar$ = showCartSidebarSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        CartComponent
      ],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize showCartSidebar based on LayoutService', () => {
    expect(component.showCartSidebar).toBeFalse();
    showCartSidebarSubject.next(false);
    fixture.detectChanges();

    expect(component.showCartSidebar).toBeFalse();
    showCartSidebarSubject.next(true);
    fixture.detectChanges();

    expect(component.showCartSidebar).toBeTrue();
  });

  it('should render cart sidebar when showCartSidebar is true', () => {
    showCartSidebarSubject.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-cart')).toBeTruthy();
  });

  it('should not render cart sidebar when showCartSidebar is false', () => {
    showCartSidebarSubject.next(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-cart')).toBeNull();
  });
});
