import { TestBed } from '@angular/core/testing';

import { ProductsDataService } from './products-data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProductsDataService', () => {
  let service: ProductsDataService;
  let externalService: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,ProductsDataService,HttpHandler]
    });
    service = TestBed.inject(ProductsDataService);
    externalService = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(externalService).toBeTruthy();
  });
});
