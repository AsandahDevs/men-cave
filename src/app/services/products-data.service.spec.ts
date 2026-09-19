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

  it('should retrieve products from the page Dynamic Zone', () => {
    const strapiResponse = {
      data: {
        Footer: { Footer_Content: [{ type: 'paragraph', children: [{ text: 'Mencave Inc.' }] }] },
        Sectional_Content: [{
          __component: 'page-components.page-sections',
          Page_Section_Content: [
            { type: 'heading', level: 1, children: [{ text: 'Step Into The Men Cave' }] },
            { type: 'heading', level: 2, children: [{ text: 'Where masculinity is discovered' }] },
          ],
          List_of_products: [{ id: 1, product_name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', product_price: 109.95, product_desc: 'Your perfect pack for everyday use.', is_sale: true, categories: [{ name: 'bags' }], product_image: { url: '/uploads/fjallraven.jpg' } }],
        }],
      },
    };

    const expectedProducts = [{
      id: 1,
      title: 'Fjallraven - foldsack no. 1 backpack, fits 15 laptops',
      price: 109.95,
      description: 'Your perfect pack for everyday use.',
      category: 'bags',
      image: '/uploads/fjallraven.jpg',
      sale: true,
    }];

    service.getProducts(1, 8).subscribe((result) => {
      expect(result.products).toEqual(expectedProducts);
      expect(result.total).toBe(1);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/api/pages/fxaxny0bwywkw0dc6521qiek'));
    expect(req.request.method).toBe('GET');
    expect(req.request.urlWithParams).toContain('populate[Sectional_Content][on][page-components.page-sections]');
    expect(req.request.urlWithParams).toContain('[List_of_products][populate][categories]=true');
    expect(req.request.urlWithParams).toContain('[List_of_products][populate][product_image]=true');
    req.flush(strapiResponse);
  });

  it('should filter Dynamic Zone products on the client', () => {

    service.getProducts(1, 6, 'jacket').subscribe((result) => expect(result.products).toEqual([]));

    const req = httpMock.expectOne((request) => request.url.includes('/api/pages/fxaxny0bwywkw0dc6521qiek'));
    req.flush({ data: { Sectional_Content: [{ __component: 'page-components.page-sections', List_of_products: [{ id: 1, product_name: 'Shirt', product_price: 50, product_desc: 'A shirt' }] }] } });
  });
});
