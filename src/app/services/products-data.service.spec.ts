import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsDataService } from './products-data.service';

describe('ProductsDataService', () => {
  let service: ProductsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProductsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('loads the page heading and a server-paginated product collection', () => {
    service.getProducts(1, 8, 'jeans', 'pants').subscribe((result) => {
      expect(result.products).toEqual([jasmine.objectContaining({ title: 'black jeans', category: 'pants', image: '/uploads/jeans.jpg' })]);
      expect(result.total).toBe(1);
      expect(result.headline).toBe('Where masculinity is discovered');
    });

    const pageRequest = httpMock.expectOne((request) => request.url.includes('/api/pages/fxaxny0bwywkw0dc6521qiek'));
    const productsRequest = httpMock.expectOne((request) => request.url === '/api/products');
    expect(productsRequest.request.params.get('populate')).toBe('categories,image');
    expect(productsRequest.request.params.get('filters[name][$containsi]')).toBe('jeans');
    expect(productsRequest.request.params.get('filters[categories][name][$eq]')).toBe('pants');
    expect(productsRequest.request.params.get('pagination[pageSize]')).toBe('8');

    pageRequest.flush({ data: { Sectional_Content: [{ __component: 'page-components.page-sections', Page_Section_Content: [
      { type: 'heading', level: 1, children: [{ text: 'Step Into The Men Cave' }] },
      { type: 'heading', level: 2, children: [{ text: 'Where masculinity is discovered' }] },
    ] }] } });
    productsRequest.flush({ data: [{ id: 2, name: 'black jeans', description: 'Jeans for all occasions', price: 899.99, is_on_sale: false, categories: [{ name: 'pants' }], image: { url: '/uploads/jeans.jpg' }], meta: { pagination: { page: 1, pageCount: 1, total: 1 } } });
  });

  it('loads available categories from their collection endpoint', () => {
    service.getCategories().subscribe((categories) => expect(categories).toEqual(['jackets', 'pants']));
    const request = httpMock.expectOne('/api/categories?sort=name');
    request.flush({ data: [{ name: 'jackets' }, { name: 'pants' }] });
  });
});
