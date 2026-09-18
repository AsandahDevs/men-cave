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

    service.getProducts(1, 8).subscribe((result) => {
      expect(result.products).toEqual(expectedProducts);
      expect(result.total).toBe(1);
    });

    const req = httpMock.expectOne((request) => request.url === '/api/products');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('populate')).toBe('image,categories');
    expect(req.request.params.get('pagination[page]')).toBe('1');
    expect(req.request.params.get('pagination[pageSize]')).toBe('8');
    req.flush({ ...strapiResponse, meta: { pagination: { page: 1, pageCount: 1, total: 1 } } });
  });

  it('should request product images and categories', () => {

    service.getProducts(1, 6, 'jacket', 'jackets').subscribe();

    const req = httpMock.expectOne((request) => request.url === '/api/products');
    expect(req.request.params.get('filters[name][$containsi]')).toBe('jacket');
    expect(req.request.params.get('filters[categories][name][$eq]')).toBe('jackets');
    req.flush({ data: [], meta: { pagination: { page: 1, pageCount: 1, total: 0 } } });
  });
});
