import { TestBed } from '@angular/core/testing';

import { ProductsDataService } from './products-data.service';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';

describe('ProductsDataService', () => {
  let service: ProductsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsDataService],
    });
    service = TestBed.inject(ProductsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the API', () => {
    const strapiResponse = {
      data: [
      {
        id: 1,
        name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        image: [{ url: '/uploads/fjallraven.jpg' }],
        categories: [{ name: 'bags' }],
        sale: true,
      },
    ]};

    const expectedProducts = [{
      id: 1,
      title: 'Fjallraven - foldsack no. 1 backpack, fits 15 laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: 'bags',
      image: '/uploads/fjallraven.jpg',
      sale: true,
    }];

    service.getProducts().subscribe((products: any) => {
      expect(products).toEqual(expectedProducts);
    });

    const req = httpMock.expectOne('/api/products?populate=image,categories');
    expect(req.request.method).toBe('GET');
    req.flush(strapiResponse);
  });

  it('should request product images and categories', () => {

    service.getProducts().subscribe();

    const req = httpMock.expectOne('/api/products?populate=image,categories');
    expect(req.request.urlWithParams).toBe('/api/products?populate=image,categories');
    req.flush({ data: [] });
  });
});
