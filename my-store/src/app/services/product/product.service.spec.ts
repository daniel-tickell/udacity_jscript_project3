// src/app/services/product/product.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the assets/data.json', () => {
    const dummyProducts = [
      { id: 1, name: 'Test Product 1',  price: 10, url: '',description: 'Desc 1'},
      { id: 2, name: 'Test Product 2',  price: 20, url: '',description: 'Desc 2' }
    ];


    service.getProducts().subscribe(products => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpTestingController.expectOne('assets/data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyProducts);
  });
});
